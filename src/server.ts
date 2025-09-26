import { App } from '@/app';
import { ValidateEnv } from '@kishornaik/utils';
import { trpcModulesFederation } from './modules/app.Module';
import { removeDatabase, setDatabase } from './config/db';
import { runEventDispatcherWorker } from './workers/eventDispatcher';

ValidateEnv();

const bootstrap = () => {
	new App()
		.initializeProcessExceptionHandling()
		.initializeMiddlewares((app) => {
			// Custom middlewares can be initialized here
			// eg: app.use();
		})
		.initializeRestApiRoutes()
		.initializeTrpcRoutes(trpcModulesFederation)
		.initializeDatabase(setDatabase)
		.initializeErrorHandling()
		.listen(async (app) => {
			// Custom listener tasks can be executed here
			// eg: someService.initialize();
			await runEventDispatcherWorker();
		})
		.gracefulShutdown(async () => {
			// cleanup tasks after server is closed
			await removeDatabase();
		});
};

bootstrap();
