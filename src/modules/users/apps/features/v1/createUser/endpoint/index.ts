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
import { CreateUserRequestDto, CreateUserResponseDto } from '../contract';
import { CreateUserCommand } from '../command';

@Route('api/v1/users')
@Tags('Users')
export class CreateUserEndpoint extends Endpoint {
	/**
	 * Create User
	 */
	@Post()
	@Produces('application/json')
	@SuccessResponse(StatusCodes.CREATED, 'Ok') // Custom success response
  @Response(StatusCodes.BAD_REQUEST, 'Bad Request')
	@Middlewares([ValidationMiddleware(CreateUserRequestDto)])
	public async postAsync(
		@Request() req: express.Request,
		@Body() body: CreateUserRequestDto
	): Promise<DataResponse<CreateUserResponseDto>> {
		// Consume Command
		const response = await mediator.send(new CreateUserCommand(body));

		// Set Status Code based on the response
		this.setStatus(response.statusCode);

		return response;
	}
}
