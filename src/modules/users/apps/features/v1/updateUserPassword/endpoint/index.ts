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
  Patch
} from 'tsoa';
import express from 'express';
import { DataResponse, StatusCodes } from '@kishornaik/utils';
import { ValidationMiddleware } from '@/middlewares/security/validations';
import { Endpoint } from '@/shared/utils/helpers/tsoa';
import { mediator } from '@/shared/utils/helpers/medaitR';
import { UpdateUserPasswordRequestDto, UpdateUserPasswordResponseDto } from '../contract';
import { UpdateUserPasswordCommand } from '../command';

@Route('api/v1/users')
@Tags('Users')
export class UpdatePasswordUserEndpoint extends Endpoint {
	/**
	 * Update User Password
	 */
	@Patch("{id}")
	@Produces('application/json')
	@SuccessResponse(StatusCodes.CREATED, 'Ok') // Custom success response
  @Response(StatusCodes.BAD_REQUEST, 'Bad Request')
	@Middlewares([ValidationMiddleware(UpdateUserPasswordRequestDto)])
	public async patchAsync(
		@Request() req: express.Request,
    @Path() id: string,
		@Body() body: UpdateUserPasswordRequestDto
	): Promise<DataResponse<UpdateUserPasswordResponseDto>> {
		// Consume Command
    body.id = id;
		const response = await mediator.send(new UpdateUserPasswordCommand(body));

		// Set Status Code based on the response
		this.setStatus(response.statusCode);

		return response;
	}
}
