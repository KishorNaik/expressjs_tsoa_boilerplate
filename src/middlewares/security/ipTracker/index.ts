import { logger } from '@/shared/utils/helpers/loggers';
import { Request, Response, NextFunction } from 'express';
import geoip from 'geoip-lite';

// Extend the Request interface to add the ipAddress property
declare module 'express-serve-static-core' {
	interface Request {
		ipAddress?: string;
		geo?: geoip.Lookup;
		// Optional, as it might not be set if there's an error
	}
}

export const ipTrackerMiddleware = (req: Request, res: Response, next: NextFunction) => {
	const clientIp = req.ip;

	if (clientIp) {
		req.ipAddress = clientIp; // Attach to the request object for later use
		logger.info(`Incoming request from IP: ${clientIp} to ${req.path}`);

		const geo = geoip.lookup(clientIp);
		if (geo) {
			req.geo = geo; // Attach geo information to the request object
			logger.info(`Geo information for IP ${clientIp}: ${JSON.stringify(geo)}`);
		} else {
			logger.warn(`No geo information found for IP: ${clientIp}`);
			req.geo = undefined; // Explicitly set to undefined if no geo info is found
		}
	} else {
		logger.warn(`Could not determine IP address for request to ${req.path}`);
		req.ipAddress = undefined; // Explicitly set to undefined
	}

	next(); // Pass control to the next middleware or route handler
};
