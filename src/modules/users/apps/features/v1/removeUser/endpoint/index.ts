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
	Delete,
	Response,
} from 'tsoa';
import express from 'express';
import { Container, DataResponse, DataResponseFactory, StatusCodes } from '@kishornaik/utils';
import { ValidationMiddleware } from '@/middlewares/security/validations';
import { Endpoint } from '@/shared/utils/helpers/tsoa';
import { RemoveUserRequestDto, RemoveUserResponseDto } from '../contract';
import { RemoveUserDbService } from '../services/db';
import { getTraceId, logConstruct, logger } from '@/shared/utils/helpers/loggers';

@Route('api/v1/users')
@Tags('Users')
export class RemoveUserEndpoint extends Endpoint {
	private readonly _removeUserDbService: RemoveUserDbService;

	public constructor() {
		super();
		this._removeUserDbService = Container.get(RemoveUserDbService);
	}

	/**
	 * Remove User
	 */
	@Delete('{id}')
	@Produces('application/json')
	@SuccessResponse(StatusCodes.OK, 'Ok') // Custom success response
	@Response(StatusCodes.BAD_REQUEST, 'Bad Request')
	@Response(StatusCodes.NOT_FOUND, 'Not Found')
	@Response(StatusCodes.INTERNAL_SERVER_ERROR, 'Internal Server Error')
	@Middlewares([
		ValidationMiddleware({
			params: RemoveUserRequestDto,
		}),
	])
	public async deleteAsync(
		@Request() req: express.Request,
		@Path() id: string
	): Promise<DataResponse<RemoveUserResponseDto>> {
		const traceId = getTraceId();
		try {
			// Request
			const request = new RemoveUserRequestDto();
			request.id = id;

			// Remove User Db Service
			const removeUserDbServiceResult = await this._removeUserDbService.handleAsync(request);
			if (removeUserDbServiceResult.isErr()) {
				this.setStatus(removeUserDbServiceResult.error.statusCode);
				return DataResponseFactory.error(
					removeUserDbServiceResult.error.statusCode,
					removeUserDbServiceResult.error.message,
					null,
					traceId,
					null
				);
			}

			// Response
			const response: RemoveUserResponseDto = new RemoveUserResponseDto();
			response.message = `User removed successfully.`;

			this.setStatus(StatusCodes.OK);
			return DataResponseFactory.success(
				StatusCodes.OK,
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
