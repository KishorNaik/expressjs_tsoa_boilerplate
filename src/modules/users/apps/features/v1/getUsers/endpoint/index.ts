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
	Queries,
	Response,
} from 'tsoa';
import express from 'express';
import {
	Container,
	DataResponse,
	DataResponseFactory,
	getPropertyNameByType,
	Order,
	PaginationDataResponseModel,
	StatusCodes,
} from '@kishornaik/utils';
import { ValidationMiddleware } from '@/middlewares/security/validations';
import { Endpoint } from '@/shared/utils/helpers/tsoa';
import { GetUsersRequestDto, GetUsersResponseDto } from '../contracts';
import { getTraceId, logConstruct, logger } from '@/shared/utils/helpers/loggers';
import { GetUsersDbService } from '../services/db';

@Route('api/v1/users')
@Tags('Users')
export class GetUsersEndpoint extends Endpoint {
	private readonly _getUsersDbService: GetUsersDbService;

	public constructor() {
		super();
		this._getUsersDbService = Container.get(GetUsersDbService);
	}

	/**
	 * Get user with filter
	 */
	@Get()
	@Produces('application/json')
	@SuccessResponse(StatusCodes.OK, 'Ok') // Custom success response
	@Response(StatusCodes.BAD_REQUEST, 'Bad Request')
	@Response(StatusCodes.NOT_FOUND, 'Not Found')
	@Response(StatusCodes.INTERNAL_SERVER_ERROR, 'Internal Server Error')
	@Middlewares([
		ValidationMiddleware({
			query: GetUsersRequestDto,
		}),
	])
	public async getsAsync(
		@Request() req: express.Request,
		@Queries() request: GetUsersRequestDto
	): Promise<DataResponse<GetUsersResponseDto[]>> {
		// Note: Do not add Array as Type use instead [], otherwise tsoa will throw error
		const traceId = getTraceId();

		try {
			// Get Users Db Service
			const getUserDbServiceResult = await this._getUsersDbService.handleAsync({
				request: request,
				order: {
					by: [
						getPropertyNameByType<GetUsersRequestDto>('byEmailId'),
						getPropertyNameByType<GetUsersRequestDto>('byPhoneNumber'),
					],
					direction: Order.DESC,
				},
			});
			if (getUserDbServiceResult.isErr()) {
				this.setStatus(getUserDbServiceResult.error.statusCode);
				return DataResponseFactory.error(
					getUserDbServiceResult.error.statusCode,
					getUserDbServiceResult.error.message,
					null,
					traceId,
					null
				);
			}

			// get Db Result
			const response: GetUsersResponseDto[] = getUserDbServiceResult.value.items;
			const pagination: PaginationDataResponseModel = getUserDbServiceResult.value.page;

			this.setStatus(StatusCodes.OK);
			return DataResponseFactory.success(
				StatusCodes.OK,
				response,
				'Success',
				pagination,
				traceId,
				null
			);
		} catch (ex) {
			const error = ex as Error;
			logger.error(
				logConstruct(`GetUsersEndpoint`, `getsAsync`, error.message, traceId, error.stack)
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
