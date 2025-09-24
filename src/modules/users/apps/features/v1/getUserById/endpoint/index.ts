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
import { GetUserByIdRequestDto, GetUserByIdResponseDto } from '../contract';
import { GetUserByIdQuery } from '../query';

@Route('api/v1/users')
@Tags('Users')
export class GetUserByIdEndpoint extends Endpoint {
	/**
	 * Get User By Id
	 */
	@Get('{id}')
	@Produces('application/json')
	@SuccessResponse(StatusCodes.OK, 'Ok') // Custom success response
  @Response(StatusCodes.BAD_REQUEST, 'Bad Request')
	@Middlewares([ValidationMiddleware(GetUserByIdRequestDto)])
	public async getAsync(
		@Request() req: express.Request,
		@Path() id: string
	): Promise<DataResponse<GetUserByIdResponseDto>> {
		// Create Query
		const request = new GetUserByIdRequestDto();
		request.id = id;

		// Consume Query
		const response = await mediator.send(new GetUserByIdQuery(request));

		// Set Status Code based on the response
		this.setStatus(response.statusCode);

		return response;
	}
}
