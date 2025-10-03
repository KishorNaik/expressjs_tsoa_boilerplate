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
		return DataResponseFactory.error(
			StatusCodes.UNAUTHORIZED,
			`You are not authorized`,
			null,
			traceId,
			undefined
		);
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
					`authenticateJwt`,
					`Invalid or expired token`,
					traceId
				)
			);
			return DataResponseFactory.error(
				StatusCodes.UNAUTHORIZED,
				`Invalid or expired token`,
				null,
				traceId,
				undefined
			);
		}
		next();
	};

	if (jwtProviderConfig.algorithm === 'RS256') {
		const getKey = createJWKSClient(jwtProviderConfig.jwksUri);
		jwt.verify(token, getKey, verifyOptions, verifyCallback);
	} else {
		jwt.verify(token, jwtProviderConfig.secret, verifyOptions, verifyCallback);
	}
}

export function authorizeRole(role: string) {
	return function (req: any, res: any, next: any) {
		const traceId = getTraceId();

		const userProviderService: IUserTokenProviderService =
			Container.get(UserTokenProviderService);

		const roleFromToken = userProviderService.getUserRole(req);

		if (roleFromToken !== role) {
			const response = DataResponseFactory.response<undefined>(
				false,
				403,
				undefined,
				'Forbidden - You do not have permission to access this resource',
				undefined,
				traceId,
				undefined
			);
			return res.status(403).json(response);
		}
		next();
	};
}
