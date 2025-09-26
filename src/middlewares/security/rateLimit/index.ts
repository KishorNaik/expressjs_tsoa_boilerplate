import { NextFunction, Request, Response } from 'express';
import { DataResponseFactory, StatusCodes } from '@kishornaik/utils';
import rateLimit, { ipKeyGenerator } from 'express-rate-limit';
import { GLOBAL_WINDOW_MINUTES, RATE_LIMITER } from '@/config/env';
import { getTraceId } from '@/shared/utils/helpers/loggers';

export const rateLimitMiddleware = rateLimit({
	windowMs: parseInt(GLOBAL_WINDOW_MINUTES) * 60 * 1000, // 15 minutes
	max: parseInt(RATE_LIMITER),
	handler: (req: Request, res: Response) => {
		const traceId = getTraceId();
		const response = DataResponseFactory.response(
			false,
			StatusCodes.TOO_MANY_REQUESTS,
			null!,
			`Too many requests from this IP, please try again after ${GLOBAL_WINDOW_MINUTES} minutes`,
			undefined,
			traceId,
			undefined
		);

		res.status(StatusCodes.TOO_MANY_REQUESTS).json(response);
	},
	standardHeaders: true,
	legacyHeaders: false,
	//keyGenerator: (req: Request) => req.ip,
	keyGenerator: (req: Request) => {
		// Use API key (or some other identifier) for authenticated users
		if (typeof req.query.apiKey === 'string') return req.query.apiKey;

		// fallback to IP for unauthenticated users
		// return req.ip // vulnerable
		return ipKeyGenerator(req.ip); // better
	},
	//validate:{ipv6SubnetOrKeyGenerator: false}
});
