import { NextFunction, Request, Response } from 'express';
import { getTraceId, logger } from '@/shared/utils/helpers/loggers';
import { DataResponse } from '@kishornaik/utils';

export const ErrorMiddleware = (
	error: unknown | any,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		let status: number;
		let message: string;

		const traceId = getTraceId();

		if ('statusCode' in error && 'message' in error) {
			const dataResponse: DataResponse<undefined> = error as DataResponse<undefined>;
			status = dataResponse.statusCode || 500;
			message = dataResponse.message || 'Something went wrong';
		} else {
			status = error.status || 500;
			message = error.message || 'Something went wrong';
		}

		logger.error(
			`[${req.method}] || Path::${req.path} || StatusCode:: ${status} || Message:: ${message} || traceId: ${traceId} || StackTrace:: ${error?.stack}`
		);

		const errorResponse: DataResponse<undefined> = {
			success: false,
			statusCode: status,
			data: undefined,
			message: message,
			traceId: traceId,
		};

		res.status(status).json(errorResponse);
	} catch (error) {
		next(error);
	}
};
