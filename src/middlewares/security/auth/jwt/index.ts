import jwksClient from 'jwks-rsa';
import { JwtHeader, SigningKeyCallback } from 'jsonwebtoken';
import { Container, DataResponseFactory, StatusCodes } from '@kishornaik/utils';
import {
	IUserTokenProviderService,
	UserTokenProviderService,
} from '@/modules/shared/users/services/jwtTokenProvider';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { getTraceId, logConstruct, logger } from '@/shared/utils/helpers/loggers';
import { jwtProviderConfig } from '@/config/jwt';
import { IClaims } from '@/modules/shared/users/types';

// Custom Express Request Type
declare global {
	namespace Express {
		interface Request {
			claims?: IClaims;
			jwtTokens?: string;
		}
	}
}

function createJWKSClient(jwksUri: string) {
	const client = jwksClient({
		jwksUri,
		cache: true,
		cacheMaxEntries: 5,
		cacheMaxAge: 10 * 60 * 1000,
	});

	return function getKey(header: JwtHeader, callback: SigningKeyCallback) {
		client.getSigningKey(header.kid!, (err, key) => {
			if (err || !key) return callback(err || new Error('Key not found'), undefined);
			callback(null, key.getPublicKey());
		});
	};
}

export function authenticateJwt(req: Request, res: Response, next: NextFunction) {
	// Get traceId
	const traceId = getTraceId();

	const token = req.headers.authorization?.split(' ')[1];
	if (!token) {
		logger.error(
			logConstruct(`authenticateJwt`, `authenticateJwt`, `You are not authorized`, traceId)
		);
		const response = DataResponseFactory.error(
			StatusCodes.UNAUTHORIZED,
			`You are not authorized`,
			undefined,
			traceId,
			undefined
		);
		return res.status(StatusCodes.UNAUTHORIZED).json(response);
	}

	const verifyOptions = {
		algorithms: [jwtProviderConfig.algorithm],
		issuer: jwtProviderConfig.issuer,
		audience: jwtProviderConfig.audience,
	};

	const verifyCallback = (err: jwt.VerifyErrors | null, decoded: object | undefined) => {
		if (err || !decoded) {
			logger.error(
				logConstruct(
					`authenticateJwt`,
					`verifyCallback`,
					`Invalid or expired token`,
					traceId
				)
			);
			const response = DataResponseFactory.error(
				StatusCodes.UNAUTHORIZED,
				`Invalid or expired token`,
				undefined,
				traceId,
				undefined
			);
			return res.status(StatusCodes.UNAUTHORIZED).json(response);
		}

		// Set claims & JwtTokens to the express request Object
		req.claims = decoded as IClaims;
		req.jwtTokens = token;

		next();
	};

	if (jwtProviderConfig.algorithm === 'RS256') {
		const getKey = createJWKSClient(jwtProviderConfig.jwksUri);
		jwt.verify(token, getKey, verifyOptions, verifyCallback);
	} else {
		jwt.verify(token, jwtProviderConfig.secret, verifyOptions, verifyCallback);
	}
}

export function authorizeRole(allowedRoles: string | string[]) {
	return function (req: Request, res: Response, next: NextFunction) {
		const traceId = getTraceId();

		if (!allowedRoles || allowedRoles.length === 0) {
			const response = DataResponseFactory.error(
				StatusCodes.BAD_REQUEST,
				'You do not pass any allowed roles',
				undefined,
				traceId,
				undefined
			);
			return res.status(StatusCodes.BAD_REQUEST).json(response); // 400 (Bad Request)).json(response);
		}

		const userProviderService: IUserTokenProviderService =
			Container.get(UserTokenProviderService);

		const roleFromToken = userProviderService.getUserRole(req)?.trim().toLowerCase();
		if (!roleFromToken) {
			const response = DataResponseFactory.error(
				StatusCodes.FORBIDDEN,
				'Forbidden - You do not have permission to access this resource',
				undefined,
				traceId,
				undefined
			);
			return res.status(StatusCodes.FORBIDDEN).json(response);
		}

		const requiredRoles = Array.isArray(allowedRoles)
			? allowedRoles.map((r) => r.trim().toLowerCase())
			: [allowedRoles.trim().toLowerCase()];

		if (!requiredRoles.includes(roleFromToken)) {
			const response = DataResponseFactory.error(
				StatusCodes.FORBIDDEN,
				'Forbidden - You do not have permission to access this resource',
				undefined,
				traceId,
				undefined
			);
			return res.status(StatusCodes.FORBIDDEN).json(response);
		}

		next();
	};
}
