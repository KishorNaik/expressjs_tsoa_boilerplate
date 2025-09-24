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
import { CreateOrgRequestDto, CreateOrgResponseDto } from '../contract';
import { CreateOrgCommand } from '../command';

@Route('api/v1/organizations')
@Tags('Organizations')
export class CreateOrganizationEndpoint extends Endpoint {
	/**
	 * Create Org
	 */
	@Post()
	@Produces('application/json')
	@SuccessResponse(StatusCodes.CREATED, 'Ok') // Custom success response
  @Response(StatusCodes.BAD_REQUEST, 'Bad Request')
	@Middlewares([ValidationMiddleware(CreateOrgRequestDto)])
	public async postAsync(
		@Request() req: express.Request,
		@Body() body: CreateOrgRequestDto
	): Promise<DataResponse<CreateOrgResponseDto>> {
		// Consume Command
		const response = await mediator.send(new CreateOrgCommand(body));

		// Set Status Code based on the response
		this.setStatus(response.statusCode);

		return response;
	}
}
