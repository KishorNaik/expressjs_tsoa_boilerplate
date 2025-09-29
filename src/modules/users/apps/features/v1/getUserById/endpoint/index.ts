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
import { GetUserByIdRequestDto, GetUserByIdResponseDto } from '../contract';
import { GetUserByIdDbService } from '../services/db';
import { getTraceId, logConstruct, logger } from '@/shared/utils/helpers/loggers';

@Route('api/v1/users')
@Tags('Users')
export class GetUserByIdEndpoint extends Endpoint {
	private readonly _getUserByIdDbService: GetUserByIdDbService;

	public constructor() {
		super();
		this._getUserByIdDbService = Container.get(GetUserByIdDbService);
	}

	/**
	 * Get User By Id
	 */
	@Get('{id}')
	@Produces('application/json')
	@SuccessResponse(StatusCodes.OK, 'Ok') // Custom success response
	@Response(StatusCodes.BAD_REQUEST, 'Bad Request')
	@Response(StatusCodes.NOT_FOUND, 'Not Found')
	@Response(StatusCodes.INTERNAL_SERVER_ERROR, 'Internal Server Error')
	@Middlewares([
		ValidationMiddleware({
			params: GetUserByIdRequestDto,
		}),
	])
	public async getAsync(
		@Request() req: express.Request,
		@Path() id: string
	): Promise<DataResponse<GetUserByIdResponseDto>> {
		const traceId = getTraceId();

		try {
			// Create Query
			const request = new GetUserByIdRequestDto();
			request.id = id;

			// Get User By Id Db Service
			const getUserByIdDbServiceResult =
				await this._getUserByIdDbService.handleAsync(request);
			if (getUserByIdDbServiceResult.isErr()) {
				this.setStatus(getUserByIdDbServiceResult.error.statusCode);
				return DataResponseFactory.error(
					getUserByIdDbServiceResult.error.statusCode,
					getUserByIdDbServiceResult.error.message,
					null,
					traceId,
					null
				);
			}
			// get Db Result
			const response: GetUserByIdResponseDto = getUserByIdDbServiceResult.value;

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
				logConstruct(`GetUserByIdEndpoint`, `getAsync`, error.message, traceId, error.stack)
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
