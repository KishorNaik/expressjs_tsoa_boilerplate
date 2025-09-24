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
  Delete,
  Response
} from 'tsoa';
import express from 'express';
import { DataResponse, StatusCodes } from '@kishornaik/utils';
import { ValidationMiddleware } from '@/middlewares/security/validations';
import { Endpoint } from '@/shared/utils/helpers/tsoa';
import { mediator } from '@/shared/utils/helpers/medaitR';
import { RemoveUserRequestDto, RemoveUserResponseDto } from '../contract';
import { RemoveUserCommand } from '../command';

@Route('api/v1/users')
@Tags('Users')
export class RemoveUserEndpoint extends Endpoint {
  /**
   * Remove User
   */
  @Delete("{id}")
  @Produces('application/json')
  @SuccessResponse(StatusCodes.OK, 'Ok') // Custom success response
  //@Response(StatusCodes.BAD_REQUEST, 'Bad Request')
  @Middlewares([ValidationMiddleware(RemoveUserRequestDto)])
  public async deleteAsync(
    @Request() req: express.Request,
    @Path() id: string,
  ): Promise<DataResponse<RemoveUserResponseDto>> {

    // Request
    const request = new RemoveUserRequestDto();
    request.id = id;

    // Consume Command
    const response = await mediator.send(new RemoveUserCommand(request));

    // Set Status Code based on the response
    this.setStatus(response.statusCode);

    return response;
  }
}
