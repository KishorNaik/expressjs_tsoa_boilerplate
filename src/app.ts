import 'reflect-metadata';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import hpp from 'hpp';
import swaggerUi from 'swagger-ui-express';
import {
	NODE_ENV,
	PORT,
	LOG_FORMAT,
	ORIGIN,
	CREDENTIALS,
	SERVER_TIMEOUT,
	SERVER_KEEP_ALIVE_TIMEOUT,
	SERVER_HEADERS_TIMEOUT,
} from '@/config/env';
import { ErrorMiddleware } from '@/middlewares/exception';
import { logger, stream } from '@/shared/utils/helpers/loggers';
import actuator from 'express-actuator';
import { rateLimitMiddleware } from './middlewares/security/rateLimit';
import traceMiddleware from './middlewares/loggers/trace';
import httpLoggerMiddleware from './middlewares/loggers/http';
import { ipTrackerMiddleware } from './middlewares/security/ipTracker';
import { throttlingMiddleware } from './middlewares/security/throttling';
import { TRPCAppRouter } from './modules/app.Module';
import * as trpcExpress from '@trpc/server/adapters/express';
import { createContext } from './config/trpc';
import { RegisterRoutes } from './config/tsoaBuild/routes';
import { tooBusyMiddleware } from './middlewares/tooBusy';

type ShutdownTask = () => Promise<void>;
type CustomMiddlewareInitializerTask = (app: express.Application) => void;
type CustomListenerTask = (app: express.Application) => Promise<void>;

export class App {
	public app: express.Application;
	public env: string;
	public port: string | number;
	private _initializeDatabase: Function;

	constructor() {
		this.app = express();
		this.env = NODE_ENV || 'development';
		this.port = PORT || 3000;
	}

	public initializeProcessExceptionHandling() {
		process.on('uncaughtException', (err: Error) => {
			logger.error(`======= ❌ Uncaught Exception: ${err.message}`, { stack: err.stack });
			process.exit(1); // Optional: crash intentionally
		});

		process.on('unhandledRejection', (reason: any) => {
			const message = reason?.message || reason;
			const stack = reason?.stack || undefined;
			logger.error(`======= ❌ Unhandled Rejection: ${message}`, { stack });
		});

		logger.info(`======= ✅ Initialized process-level exception handling =======`);
		return this;
	}

	public initializeMiddlewares(customMiddlewareInitializer?: CustomMiddlewareInitializerTask) {
		// Pre defined middlewares
		this.app.set('trust proxy', true);
		this.app.use(cors());
		this.app.use(httpLoggerMiddleware);
		this.app.use(hpp());
		this.app.use(helmet());
		this.app.use(compression());
		this.app.use(express.json({ limit: '50mb' }));
		this.app.use(express.urlencoded({ extended: true }));
		this.app.use(cookieParser());
		this.app.use(actuator());
		if (NODE_ENV !== 'development') {
			this.app.use(rateLimitMiddleware);
			this.app.use(tooBusyMiddleware);
		}
		this.app.use(traceMiddleware);
		this.app.use(throttlingMiddleware);
		this.app.use(ipTrackerMiddleware);
		this.app.disable('x-powered-by');

		logger.info(`======= ✅ initialized pre defined middlewares =======`);

		// Custom middlewares added by developers
		if (typeof customMiddlewareInitializer === 'function') {
			customMiddlewareInitializer(this.app);
			logger.info(`======= ✅ initialized custom middlewares =======`);
		}

		return this;
	}

	public initializeRestApiRoutes() {
		RegisterRoutes(this.app);

		logger.info(`======= ✅ initialized rest api routes =======`);

		if (NODE_ENV === 'development') {
			this.initializeSwagger();
		}

		return this;
	}

	public initializeTrpcRoutes(appRouter: TRPCAppRouter | undefined | null) {
		if (appRouter) {
			this.app.use(
				'/trpc',
				trpcExpress.createExpressMiddleware({
					router: appRouter,
					createContext,
					allowMethodOverride: true,
				})
			);

			logger.info(`======= ✅ initialized trpc routes =======`);
		}
		return this;
	}

	public initializeDatabase(init?: Function | undefined) {
		this._initializeDatabase = init;
		return this;
	}

	public initializeErrorHandling() {
		this.app.use(ErrorMiddleware);
		logger.info(`======= ✅ initialized error handling =======`);

		return this;
	}

	public listen(customListenerTask?: CustomListenerTask) {
		const server = this.app.listen(this.port, async () => {
			logger.info(`======= ✅ ENV: ${this.env} =======`);

			await this.executeDatabase();

			if (typeof customListenerTask === 'function') {
				logger.info(`======= ✅ Custom listener initialized =======`);
				await customListenerTask(this.app);
			}

			logger.info(`======= ✅ App listening on the port ${this.port} =======`);
			logger.info(`======= ✅ Health check: http://localhost:${this.port}/health =======`);
			logger.info(`======= ✅ Info check: http://localhost:${this.port}/info =======`);
			logger.info(`======= ✅ Metrics check: http://localhost:${this.port}/metrics =======`);
			logger.info(`======= ✅ Server Started. Good to go =======`);
			logger.info(`======= 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 =======`);
		});

		server.setTimeout(parseInt(SERVER_TIMEOUT || '15000')); // Set timeout to 15 seconds (15000 milliseconds)
		server.keepAliveTimeout = parseInt(SERVER_KEEP_ALIVE_TIMEOUT || '15000');
		server.headersTimeout = parseInt(SERVER_HEADERS_TIMEOUT || '16000'); // headersTimeout should be greater than keepAliveTimeout

		return this;
	}

	public getServer() {
		return this.app;
	}

	private initializeSwagger() {
		this.app.use(
			'/api-docs',
			swaggerUi.serve,
			async (_req: express.Request, res: express.Response) => {
				return res.send(
					swaggerUi.generateHTML(await import('./config/tsoaBuild/swagger.json'))
				);
			}
		);

		logger.info(
			`======= ✅ initialized swagger routes || you can visit [http://localhost:${this.port}/api-docs] to see the api docs =======`
		);
	}

	private async executeDatabase(): Promise<void> {
		if (this._initializeDatabase) {
			await this._initializeDatabase();
			logger.info(`======= ✅ initialized database =======`);
		}
	}

	public gracefulShutdown(shutDownTasks?: ShutdownTask) {
		const signals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM'];

		for (const signal of signals) {
			process.once(signal, () => {
				logger.info(`=======🚦 Received ${signal}. Starting graceful shutdown... =======`);

				const server = this.app.listen(this.port);

				server.close(async () => {
					logger.info('======= 🛑 HTTP server closed. =======');

					try {
						if (shutDownTasks) {
							await shutDownTasks(); // Execute your custom teardown logic
							logger.info(
								'======= ✅ Shutdown task completed. Exiting process. ======='
							);
						} else {
							logger.info(
								'======= ❌ Shutdown task not found. Exiting process. ======='
							);
						}
					} catch (err) {
						logger.error('======= ❌ Shutdown task failed:', err);
					}

					process.exit(0);
				});

				setTimeout(() => {
					logger.error('======= ⏱ Force exit after timeout. =======');
					process.exit(1);
				}, 5000).unref();
			});
		}
	}
}
