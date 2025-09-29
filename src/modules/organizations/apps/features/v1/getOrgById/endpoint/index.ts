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
import {
	Container,
	DataResponse,
	DataResponseFactory,
	GuardWrapper,
	StatusCodes,
} from '@kishornaik/utils';
import { ValidationMiddleware } from '@/middlewares/security/validations';
import { Endpoint } from '@/shared/utils/helpers/tsoa';
import { GetOrgByIdRequestDto, GetOrgByIdResponseDto } from '../contract';
import { GetOrgByIdDbService } from '../services/db';
import { getTraceId, logConstruct, logger } from '@/shared/utils/helpers/loggers';

@Route('api/v1/organizations')
@Tags('Organization')
export class GetOrganizationByIdEndpoint extends Endpoint {
	private readonly _getOrgByIdDbService: GetOrgByIdDbService;

	public constructor() {
		super();
		this._getOrgByIdDbService = Container.get(GetOrgByIdDbService);
	}

	/**
	 * Get Org By Id
	 */
	@Get('{id}')
	@Produces('application/json')
	@SuccessResponse(StatusCodes.OK, 'Ok') // Custom success response
	@Response(StatusCodes.BAD_REQUEST, 'Bad Request')
	@Response(StatusCodes.INTERNAL_SERVER_ERROR, 'Internal Server Error')
	@Middlewares([
		ValidationMiddleware({
			params: GetOrgByIdRequestDto,
		}),
	])
	public async getAsync(
		@Request() req: express.Request,
		@Path() id: string
	): Promise<DataResponse<GetOrgByIdResponseDto>> {
		const traceId = getTraceId();

		try {
			// Create Query
			const request = new GetOrgByIdRequestDto();
			request.id = id;

			// Db Service
			const getOrgByIdDbServiceResult = await this._getOrgByIdDbService.handleAsync(request);
			if (getOrgByIdDbServiceResult.isErr()) {
				this.setStatus(getOrgByIdDbServiceResult.error.statusCode);
				return DataResponseFactory.error(
					getOrgByIdDbServiceResult.error.statusCode,
					getOrgByIdDbServiceResult.error.message,
					null,
					traceId,
					null
				);
			}
			// get Db Result
			const response: GetOrgByIdResponseDto = getOrgByIdDbServiceResult.value;

			// Set Status Code based on the response
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
				logConstruct(
					`GetOrganizationByIdEndpoint`,
					`getAsync`,
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
