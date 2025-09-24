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
  Response
} from 'tsoa';
import express from 'express';
import { DataResponse, StatusCodes } from '@kishornaik/utils';
import { ValidationMiddleware } from '@/middlewares/security/validations';
import { Endpoint } from '@/shared/utils/helpers/tsoa';
import { mediator } from '@/shared/utils/helpers/medaitR';
import { GetOrgByIdRequestDto, GetOrgByIdResponseDto } from '../contract';
import { GetOrgByIdQuery } from '../query';

@Route('api/v1/organizations')
@Tags('Organization')
export class GetOrganizationByIdEndpoint extends Endpoint {
	/**
	 * Get Org By Id
	 */
	@Get('{id}')
	@Produces('application/json')
	@SuccessResponse(StatusCodes.OK, 'Ok') // Custom success response
  @Response(StatusCodes.BAD_REQUEST, 'Bad Request')
	@Middlewares([ValidationMiddleware(GetOrgByIdRequestDto)])
	public async getAsync(
		@Request() req: express.Request,
		@Path() id: string
	): Promise<DataResponse<GetOrgByIdResponseDto>> {
		// Create Query
		const request = new GetOrgByIdRequestDto();
		request.id = id;

		// Consume Query
		const response = await mediator.send(new GetOrgByIdQuery(request));

		// Set Status Code based on the response
		this.setStatus(response.statusCode);

		return response;
	}
}
