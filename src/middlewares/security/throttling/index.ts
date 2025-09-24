import {
	GLOBAL_WINDOW_MINUTES,
	SLOW_DOWN_DELAY_AFTER_HITS,
	SLOW_DOWN_INITIAL_DELAY_MS,
	SLOW_DOWN_MAX_DELAY_MS,
} from '@/config/env';
import { Options, slowDown } from 'express-slow-down';
import express, { Request, Response, NextFunction } from 'express';
import { ipKeyGenerator } from 'express-rate-limit';

export const throttlingMiddleware = slowDown({
	windowMs: parseInt(GLOBAL_WINDOW_MINUTES),
	delayAfter: parseInt(SLOW_DOWN_DELAY_AFTER_HITS),
	delayMs: (hits: number) => {
		// Progressive delay, capped at SLOW_DOWN_MAX_DELAY_MS
		const calculatedDelay =
			(hits - parseInt(SLOW_DOWN_DELAY_AFTER_HITS) + 1) *
			parseInt(SLOW_DOWN_INITIAL_DELAY_MS);
		return Math.min(calculatedDelay, parseInt(SLOW_DOWN_MAX_DELAY_MS));
	},
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
