import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import winston, { format } from 'winston';
import winstonDaily from 'winston-daily-rotate-file';
import { LOG_DIR } from '@/config/env';
import { traceNamespace } from '@/middlewares/loggers/trace';
import { TraceIdWrapper } from '../traceId';

// logs dir
const logDir: string = join(__dirname, '../../../../../', LOG_DIR);

if (!existsSync(logDir)) {
	mkdirSync(logDir);
}

// Define log format
const logFormat = winston.format.printf(({ timestamp, level, message, traceId }) => {
	return `${timestamp} | ${level} | ${message} ${traceId === undefined ? '|' : `| traceId: ${traceId}`}`;
});

const traceFormat = format((info) => {
	const traceId = getTraceId();

	if (typeof traceId !== 'undefined') {
		info.traceId = traceId;
	}

	return info;
});

/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
const logger = winston.createLogger({
	format: winston.format.combine(
		winston.format.timestamp({
			format: 'YYYY-MM-DD HH:mm:ss',
		}),
		traceFormat(),
		logFormat
	),
	transports: [
		// debug log setting
		new winstonDaily({
			level: 'debug',
			datePattern: 'YYYY-MM-DD',
			dirname: logDir + '/debug', // log file /logs/debug/*.log in save
			filename: `%DATE%.log`,
			maxFiles: 30, // 30 Days saved
			json: false,
			zippedArchive: true,
		}),
		// error log setting
		new winstonDaily({
			level: 'error',
			datePattern: 'YYYY-MM-DD',
			dirname: logDir + '/error', // log file /logs/error/*.log in save
			filename: `%DATE%.log`,
			maxFiles: 30, // 30 Days saved
			handleExceptions: true,
			json: false,
			zippedArchive: true,
		}),
	],
});

logger.add(
	new winston.transports.Console({
		format: winston.format.combine(winston.format.splat(), winston.format.colorize()),
	})
);

const stream = {
	write: (message: string) => {
		logger.info(message.substring(0, message.lastIndexOf('\n')));
	},
};

const logConstruct = (
	className: string,
	methodName: string,
	message: string,
	traceId?: string,
	data?: unknown | any
): string => {
	const logMessage = `className:${className} | method:${methodName} | message:${message} | data: ${data !== undefined ? JSON.stringify(data) : ''} | traceId: ${traceId !== undefined ? traceId : ''}`;
	return logMessage;
};

const getTraceId = () => {
	const traceId = traceNamespace?.get('traceId') ?? TraceIdWrapper?.getTraceId();
	return traceId;
};

export { logger, stream, getTraceId, logConstruct };
