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
} from 'tsoa';
import express from 'express';
import { Container, DataResponse, DataResponseFactory, StatusCodes } from '@kishornaik/utils';
import { ValidationMiddleware } from '@/middlewares/security/validations';
import { Endpoint } from '@/shared/utils/helpers/tsoa';
import {
	UpdateUserQueryPathRequestDto,
	UpdateUserRequestDto,
	UpdateUserResponseDto,
} from '../contract';
import { UpdateUserDbService } from '../services/db';
import { getTraceId, logConstruct, logger } from '@/shared/utils/helpers/loggers';

@Route('api/v1/users')
@Tags('Users')
export class UpdateUserEndpoint extends Endpoint {
	private readonly _updateUserDbService: UpdateUserDbService;

	public constructor() {
		super();
		this._updateUserDbService = Container.get(UpdateUserDbService);
	}

	/**
	 * Update User
	 */
	@Put('{id}')
	@Produces('application/json')
	@SuccessResponse(StatusCodes.CREATED, 'Ok') // Custom success response
	@Response(StatusCodes.BAD_REQUEST, 'Bad Request')
	@Response(StatusCodes.NOT_FOUND, 'Not Found')
	@Response(StatusCodes.INTERNAL_SERVER_ERROR, 'Internal Server Error')
	@Middlewares([
		ValidationMiddleware({
			body: UpdateUserRequestDto,
			params: UpdateUserQueryPathRequestDto,
		}),
	])
	public async putAsync(
		@Request() req: express.Request,
		@Path('id') id: string,
		@Body() body: UpdateUserRequestDto
	): Promise<DataResponse<UpdateUserResponseDto>> {
		const traceId = getTraceId();
		try {
			// Request

			// Update User Db Service
			const updateUserDbServiceResult = await this._updateUserDbService.handleAsync(body);
			if (updateUserDbServiceResult.isErr()) {
				this.setStatus(updateUserDbServiceResult.error.statusCode);
				return DataResponseFactory.error(
					updateUserDbServiceResult.error.statusCode,
					updateUserDbServiceResult.error.message,
					null,
					traceId,
					null
				);
			}

			// Response
			const response: UpdateUserResponseDto = new UpdateUserResponseDto();
			response.message = `User updated successfully.`;

			this.setStatus(StatusCodes.OK);
			return DataResponseFactory.success(
				StatusCodes.OK,
				response,
				`Success`,
				null,
				traceId,
				null
			);
		} catch (ex) {
			const error = ex as Error;
			logger.error(
				logConstruct(`UpdateUserEndpoint`, `putAsync`, error.message, traceId, error.stack)
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
