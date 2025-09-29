import {
	Body,
	Get,
	Path,
	Post,
	Produces,
	Query,
	Route,
	SuccessResponse,
	Tags,
	Request,
	Middlewares,
	Response,
} from 'tsoa';
import express from 'express';
import { Container, DataResponse, DataResponseFactory, StatusCodes } from '@kishornaik/utils';
import { ValidationMiddleware } from '@/middlewares/security/validations';
import { Endpoint } from '@/shared/utils/helpers/tsoa';
import { mediator } from '@/shared/utils/helpers/medaitR';
import { CreateUserRequestDto, CreateUserResponseDto } from '../contract';
import { UserHashPasswordService } from '@/modules/users/shared/services/hashPassword';
import { CreateUserDbService } from '../services/db';
import { getTraceId, logConstruct, logger } from '@/shared/utils/helpers/loggers';

@Route('api/v1/users')
@Tags('Users')
export class CreateUserEndpoint extends Endpoint {
	private readonly _hashPasswordService: UserHashPasswordService;
	private readonly _createUserDbService: CreateUserDbService;

	public constructor() {
		super();
		this._hashPasswordService = Container.get(UserHashPasswordService);
		this._createUserDbService = Container.get(CreateUserDbService);
	}

	/**
	 * Create User
	 */
	@Post()
	@Produces('application/json')
	@SuccessResponse(StatusCodes.CREATED, 'Ok') // Custom success response
	@Response(StatusCodes.BAD_REQUEST, 'Bad Request')
	@Response(StatusCodes.INTERNAL_SERVER_ERROR, 'Internal Server Error')
	@Middlewares([
		ValidationMiddleware({
			body: CreateUserRequestDto,
		}),
	])
	public async postAsync(
		@Request() req: express.Request,
		@Body() body: CreateUserRequestDto
	): Promise<DataResponse<CreateUserResponseDto>> {
		// Get Trace Id
		const traceId = getTraceId();

		try {
			// Hash Password Service
			const hashPasswordServiceResult = await this._hashPasswordService.handleAsync({
				password: body.password,
			});
			if (hashPasswordServiceResult.isErr()) {
				this.setStatus(hashPasswordServiceResult.error.statusCode);
				return DataResponseFactory.error(
					hashPasswordServiceResult.error.statusCode,
					hashPasswordServiceResult.error.message,
					null,
					traceId,
					null
				);
			}
			const hashPasswordResult = hashPasswordServiceResult.value;

			// Create User Db Service
			const createUserDbServiceResult = await this._createUserDbService.handleAsync({
				request: body,
				password: {
					hash: hashPasswordResult.hash,
					salt: hashPasswordResult.salt,
				},
			});
			if (createUserDbServiceResult.isErr()) {
				this.setStatus(createUserDbServiceResult.error.statusCode);
				return DataResponseFactory.error(
					createUserDbServiceResult.error.statusCode,
					createUserDbServiceResult.error.message,
					null,
					traceId,
					null
				);
			}
			const response: CreateUserResponseDto = createUserDbServiceResult.value;

			// Set Status Code based on the response
			this.setStatus(StatusCodes.CREATED);

			return DataResponseFactory.success(
				StatusCodes.CREATED,
				response,
				'Success',
				null,
				traceId,
				null
			);
		} catch (ex) {
			const error = ex as Error;
			logger.error(
				logConstruct(`CreateUserEndpoint`, `postAsync`, error.message, traceId, error.stack)
			);
			this.setStatus(StatusCodes.INTERNAL_SERVER_ERROR);
			return DataResponseFactory.error(
				StatusCodes.INTERNAL_SERVER_ERROR,
				error.message,
				null,
				traceId,
				null
			);
		}
	}
}
