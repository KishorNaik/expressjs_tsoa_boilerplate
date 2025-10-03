import { HMAC_SECRET_KEY } from '@/config/env';
import { getTraceId, logConstruct, logger } from '@/shared/utils/helpers/loggers';
import {
	DataResponseFactory,
	Ok,
	Result,
	ResultError,
	ResultFactory,
	HmacWrapper,
} from '@kishornaik/utils';
import express, { Request, Response, NextFunction } from 'express';

export async function authenticateHmac(req: Request, res: Response, next: NextFunction) {
	const receivedSignature = req.headers['x-hmac-signature'] as string;
	const clientId = req.headers['x-hmac-client-id'] as string;
	const timestamp = req.headers['x-hmac-timestamp'] as string;

	const traceId = getTraceId();

	if (!clientId || !receivedSignature || !timestamp) {
		const missing = !clientId ? 'Client Id' : !receivedSignature ? 'Signature' : 'Timestamp';
		logger.error(
			logConstruct('authenticateHmac', 'authenticateHmac', `${missing} is required`)
		);
		const response = DataResponseFactory.response<undefined>(
			false,
			403,
			undefined,
			`Forbidden - ${missing} is required`,
			undefined,
			traceId,
			undefined
		);
		return res.status(403).json(response);
	}

	const now = Date.now();
	const requestTime = Number(timestamp);
	if (isNaN(requestTime) || Math.abs(now - requestTime) > 5 * 60 * 1000) {
		const response = DataResponseFactory.response<undefined>(
			false,
			403,
			undefined,
			'Forbidden - Timestamp is invalid or expired',
			undefined,
			traceId,
			undefined
		);
		return res.status(403).json(response);
	}

	const secretKeyResult = await getSecretKeyFromDatabaseAsync(clientId);
	if (secretKeyResult.isErr()) {
		logger.error(
			logConstruct(
				`authenticateHmac`,
				`authenticateHmac`,
				`Forbidden - You do not have permission to access this resource: ${secretKeyResult.error.message}`
			)
		);

		const response = DataResponseFactory.response<undefined>(
			false,
			403,
			undefined,
			`Forbidden - You do not have permission to access this resource: ${secretKeyResult.error.message}`,
			undefined,
			traceId,
			undefined
		);
		return res.status(response.statusCode).json(response);
	}

	const SECRET_KEY = secretKeyResult.value;

	const endpoint = req.originalUrl.trim();
	const hasBody = !['GET', 'DELETE'].includes(req.method);
	const body = hasBody ? JSON.stringify(req.body).replace(/\s+/g, '') : undefined;

	const canonicalPayload = body ? `${timestamp}:${endpoint}:${body}` : `${timestamp}:${endpoint}`;

	const compareHmacResult = HmacWrapper.compare(canonicalPayload, SECRET_KEY, receivedSignature);
	if (compareHmacResult.isErr()) {
		logger.error(
			logConstruct(
				`authenticateHmac`,
				`authenticateHmac`,
				`Forbidden - You do not have permission to access this resource: ${compareHmacResult.error.message}`
			)
		);

		const response = DataResponseFactory.response<undefined>(
			false,
			403,
			undefined,
			compareHmacResult.error.message,
			undefined,
			traceId,
			undefined
		);
		return res.status(response.statusCode).json(response);
	}

	next();
}

const getSecretKeyFromDatabaseAsync = async (
	clientId: string
): Promise<Result<string, ResultError>> => {
	// Get secret key from database by clientId
	/*
	const getUsersByClientIdService: GetUsersByClientIdService =
		Container.get(GetUsersByClientIdService);
	const getUsersByClientIdServiceResult = await getUsersByClientIdService.handleAsync({
		clientId: clientId,
	});
	if (getUsersByClientIdServiceResult.isErr())
		return ResultExceptionFactory.error(
			getUsersByClientIdServiceResult.error.status,
			getUsersByClientIdServiceResult.error.message
		);

	const secretKey: string = getUsersByClientIdServiceResult.value.keys.hmacSecretKey;
	return new Ok(secretKey);
  */

	// NOTE: DO NOT USE IN THE PRODUCTION
	return ResultFactory.success(HMAC_SECRET_KEY);
};
