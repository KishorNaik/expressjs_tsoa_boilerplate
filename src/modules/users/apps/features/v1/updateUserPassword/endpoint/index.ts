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
	Put,
	Patch,
} from 'tsoa';
import express from 'express';
import { Container, DataResponse, DataResponseFactory, StatusCodes } from '@kishornaik/utils';
import { ValidationMiddleware } from '@/middlewares/security/validations';
import { Endpoint } from '@/shared/utils/helpers/tsoa';
import {
	UpdateUserPasswordQueryPathRequestDto,
	UpdateUserPasswordRequestDto,
	UpdateUserPasswordResponseDto,
} from '../contract';
import { UserHashPasswordService } from '@/modules/users/shared/services/hashPassword';
import { UpdatePasswordDbService } from '../services/db';
import { getTraceId, logConstruct, logger } from '@/shared/utils/helpers/loggers';

@Route('api/v1/users')
@Tags('Users')
export class UpdatePasswordUserEndpoint extends Endpoint {
	private readonly _userHashPasswordService: UserHashPasswordService;
	private readonly _updatePasswordDbService: UpdatePasswordDbService;

	public constructor() {
		super();
		this._userHashPasswordService = Container.get(UserHashPasswordService);
		this._updatePasswordDbService = Container.get(UpdatePasswordDbService);
	}

	/**
	 * Update User Password
	 */
	@Patch('{id}')
	@Produces('application/json')
	@SuccessResponse(StatusCodes.CREATED, 'Ok') // Custom success response
	@Response(StatusCodes.BAD_REQUEST, 'Bad Request')
	@Response(StatusCodes.INTERNAL_SERVER_ERROR, 'Internal Server Error')
	@Middlewares([
		ValidationMiddleware({
			body: UpdateUserPasswordRequestDto,
			params: UpdateUserPasswordQueryPathRequestDto,
		}),
	])
	public async patchAsync(
		@Request() req: express.Request,
		@Path() id: string,
		@Body() body: UpdateUserPasswordRequestDto
	): Promise<DataResponse<UpdateUserPasswordResponseDto>> {
		const traceId = getTraceId();
		try {
			// Password Hash Service
			const hashPasswordServiceResult = await this._userHashPasswordService.handleAsync({
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

			// Update Password Db Service
			const response = await this._updatePasswordDbService.handleAsync({
				newPasswordHash: hashPasswordResult.hash,
				newPasswordSalt: hashPasswordResult.salt,
				userId: id,
			});
			if (response.isErr()) {
				this.setStatus(response.error.statusCode);
				return DataResponseFactory.error(
					response.error.statusCode,
					response.error.message,
					null,
					traceId,
					null
				);
			}

			// Response
			const responseDto: UpdateUserPasswordResponseDto = new UpdateUserPasswordResponseDto();
			responseDto.message = `Password updated successfully.`;

			this.setStatus(StatusCodes.OK);

			return DataResponseFactory.success(
				StatusCodes.OK,
				responseDto,
				'Success',
				null,
				traceId,
				null
			);
		} catch (ex) {
			const error = ex as Error;
			logger.error(
				logConstruct(
					`UpdatePasswordUserEndpoint`,
					`patchAsync`,
					error.message,
					traceId,
					error.stack
				)
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
