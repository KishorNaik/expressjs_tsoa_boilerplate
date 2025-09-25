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
import { CreateOrgRequestDto, CreateOrgResponseDto } from '../contract';
import { CreateOrgDbService } from '../services/db';
import { getTraceId, logConstruct, logger } from '@/shared/utils/helpers/loggers';

@Route('api/v1/organizations')
@Tags('Organizations')
export class CreateOrganizationEndpoint extends Endpoint {
	private readonly _createOrgDbService: CreateOrgDbService;

	public constructor() {
		super();
		this._createOrgDbService = Container.get(CreateOrgDbService);
	}

	/**
	 * Create Org
	 */
	@Post()
	@Produces('application/json')
	@SuccessResponse(StatusCodes.CREATED, 'Ok') // Custom success response
	@Response(StatusCodes.BAD_REQUEST, 'Bad Request')
	@Response(StatusCodes.INTERNAL_SERVER_ERROR, 'Internal Server Error')
	@Middlewares([ValidationMiddleware(CreateOrgRequestDto)])
	public async postAsync(
		@Request() req: express.Request,
		@Body() body: CreateOrgRequestDto
	): Promise<DataResponse<CreateOrgResponseDto>> {
		// Get TraceId
		const traceId = getTraceId();
		try {
			// Db Service
			const createDbServiceResult = await this._createOrgDbService.handleAsync(body);
			if (createDbServiceResult.isErr()) {
				this.setStatus(createDbServiceResult.error.statusCode);
				return DataResponseFactory.error(
					createDbServiceResult.error.statusCode,
					createDbServiceResult.error.message,
					null,
					traceId,
					null
				);
			}

			// Response
			const response: CreateOrgResponseDto = new CreateOrgResponseDto();
			response.message = `Organization created successfully`;

			// Set Status Code based on the response
			this.setStatus(StatusCodes.CREATED);
			return DataResponseFactory.success(
				StatusCodes.CREATED,
				response,
				'Success',
				traceId,
				null
			);
		} catch (ex) {
			const error = ex as Error;
			logger.error(
				logConstruct(
					`CreateOrganizationEndpoint`,
					`postAsync`,
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
