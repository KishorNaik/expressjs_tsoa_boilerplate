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
  Response
} from 'tsoa';
import express from 'express';
import { DataResponse, StatusCodes } from '@kishornaik/utils';
import { ValidationMiddleware } from '@/middlewares/security/validations';
import { Endpoint } from '@/shared/utils/helpers/tsoa';
import { mediator } from '@/shared/utils/helpers/medaitR';
import { GetUsersRequestDto, GetUsersResponseDto } from '../contracts';
import { GetUsersQuery } from '../query';

@Route('api/v1/users')
@Tags('Users')
export class GetUsersEndpoint extends Endpoint {
	/**
	 * Get user with filter
	 */
	@Get()
	@Produces('application/json')
	@SuccessResponse(StatusCodes.OK, 'Ok') // Custom success response
  @Response(StatusCodes.BAD_REQUEST, 'Bad Request')
  @Response(StatusCodes.NOT_FOUND, 'Not Found')
	@Middlewares([ValidationMiddleware(GetUsersRequestDto)])
	public async getsAsync(
		@Request() req: express.Request,
		@Queries() request: GetUsersRequestDto
	) : Promise<DataResponse<GetUsersResponseDto[]>> { // Note: Do not add Array as Type use instead [], otherwise tsoa will throw error
		// Consume Query
		const response = await mediator.send(new GetUsersQuery(request));
		// Set Status Code based on the response
		this.setStatus(response.statusCode);

		return response;
	}
}
