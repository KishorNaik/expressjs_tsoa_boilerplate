import { getTraceId, logConstruct, logger } from '@/shared/utils/helpers/loggers';
import {
	DataResponseFactory,
	Ok,
	Result,
	ResultError,
	ResultFactory,
	compareHmac,
} from '@kishornaik/utils';
import express, { Request, Response, NextFunction } from 'express';

export async function authenticateHmac(req: Request, res: Response, next: NextFunction) {
	const payload =
		req.method === 'GET' || req.method === 'DELETE'
			? req.originalUrl.trim()
			: JSON.stringify(req.body).replace(/\s+/g, '');
	const receivedSignature = req.headers['x-auth-signature'] as string;
	const clientId = req.headers['x-client-id'] as string;

	const traceId = getTraceId();

	if (!clientId) {
		logger.error(
			logConstruct(
				`authenticateHmac`,
				`authenticateHmac`,
				`Forbidden - You do not have permission to access this resource: Client Id is required`
			)
		);
		const response = DataResponseFactory.response<undefined>(
			false,
			403,
			undefined,
			'Forbidden - You do not have permission to access this resource: Client Id is required',
			undefined,
			traceId,
			undefined
		);
		return res.status(403).json(response);
	}

	if (!receivedSignature) {
		logger.error(
			logConstruct(
				`authenticateHmac`,
				`authenticateHmac`,
				`Forbidden - You do not have permission to access this resource: receivedSignature is required`
			)
		);
		const response = DataResponseFactory.response<undefined>(
			false,
			403,
			undefined,
			'Forbidden - You do not have permission to access this resource: Signature is required',
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

	const compareHmacResult = compareHmac(payload, SECRET_KEY, receivedSignature);
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
	return ResultFactory.success('ok');
};
