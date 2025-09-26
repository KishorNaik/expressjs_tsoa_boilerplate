import toobusy from 'toobusy-js';
import { Request, Response, NextFunction } from 'express';
import { getTraceId, logger } from '@/shared/utils/helpers/loggers';
import { DataResponseFactory, StatusCodes } from '@kishornaik/utils';

export const tooBusyMiddleware = (req: Request, res: Response, next: NextFunction) => {
	if (toobusy()) {
		logger.error(`'======= ❌ Server is too busy. Please try again later. ======='`); // Log the error message

		const traceId = getTraceId();

		const response = DataResponseFactory.response<undefined>(
			false,
			StatusCodes.SERVICE_UNAVAILABLE,
			undefined,
			'Service Unavailable - Server is too busy. Please try again later.',
			undefined,
			traceId,
			undefined
		);
		return res.status(StatusCodes.SERVICE_UNAVAILABLE).json(response);
	} else {
		next(); // Pass control to the next middleware or route handler
	}
};
