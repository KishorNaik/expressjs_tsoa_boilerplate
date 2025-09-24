/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import {  fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UpdatePasswordUserEndpoint } from './../../modules/users/apps/features/v1/updateUserPassword/endpoint/index';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UpdateUserEndpoint } from './../../modules/users/apps/features/v1/updateUser/endpoint/index';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { RemoveUserEndpoint } from './../../modules/users/apps/features/v1/removeUser/endpoint/index';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { GetUsersEndpoint } from './../../modules/users/apps/features/v1/getUsers/endpoint/index';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { GetUserByIdEndpoint } from './../../modules/users/apps/features/v1/getUserById/endpoint/index';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CreateUserEndpoint } from './../../modules/users/apps/features/v1/createUser/endpoint/index';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { GetOrganizationByIdEndpoint } from './../../modules/organizations/apps/features/v1/getOrgById/endpoint/index';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CreateOrganizationEndpoint } from './../../modules/organizations/apps/features/v1/createOrg/endpoint/index';
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';



// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "StatusCodes": {
        "dataType": "refEnum",
        "enums": [100,101,102,103,200,201,202,203,204,205,206,207,300,301,302,303,304,305,307,308,400,401,402,403,404,405,406,407,408,409,410,411,412,413,414,415,416,417,418,419,420,421,422,423,424,426,428,429,431,451,500,501,502,503,504,505,507,511],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateUserPasswordResponseDto": {
        "dataType": "refObject",
        "properties": {
            "message": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PaginationDataResponseModel": {
        "dataType": "refObject",
        "properties": {
            "currentPage": {"dataType":"double"},
            "totalPages": {"dataType":"double"},
            "pageSize": {"dataType":"double"},
            "totalCount": {"dataType":"double"},
            "hasPrevious": {"dataType":"boolean"},
            "hasNext": {"dataType":"boolean"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DataResponse_UpdateUserPasswordResponseDto_": {
        "dataType": "refObject",
        "properties": {
            "success": {"dataType":"boolean"},
            "statusCode": {"ref":"StatusCodes"},
            "data": {"ref":"UpdateUserPasswordResponseDto"},
            "message": {"dataType":"string"},
            "pagination": {"ref":"PaginationDataResponseModel"},
            "timestamp": {"dataType":"string"},
            "traceId": {"dataType":"string"},
            "metaData": {"dataType":"any"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateUserPasswordRequestDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string"},
            "password": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateUserResponseDto": {
        "dataType": "refObject",
        "properties": {
            "identifier": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DataResponse_UpdateUserResponseDto_": {
        "dataType": "refObject",
        "properties": {
            "success": {"dataType":"boolean"},
            "statusCode": {"ref":"StatusCodes"},
            "data": {"ref":"UpdateUserResponseDto"},
            "message": {"dataType":"string"},
            "pagination": {"ref":"PaginationDataResponseModel"},
            "timestamp": {"dataType":"string"},
            "traceId": {"dataType":"string"},
            "metaData": {"dataType":"any"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateUserRequestDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string"},
            "firstName": {"dataType":"string"},
            "lastName": {"dataType":"string"},
            "email": {"dataType":"string"},
            "phoneNumber": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RemoveUserResponseDto": {
        "dataType": "refObject",
        "properties": {
            "message": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DataResponse_RemoveUserResponseDto_": {
        "dataType": "refObject",
        "properties": {
            "success": {"dataType":"boolean"},
            "statusCode": {"ref":"StatusCodes"},
            "data": {"ref":"RemoveUserResponseDto"},
            "message": {"dataType":"string"},
            "pagination": {"ref":"PaginationDataResponseModel"},
            "timestamp": {"dataType":"string"},
            "traceId": {"dataType":"string"},
            "metaData": {"dataType":"any"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GetUsersResponseDto": {
        "dataType": "refObject",
        "properties": {
            "identifier": {"dataType":"string"},
            "firstName": {"dataType":"string"},
            "lastName": {"dataType":"string"},
            "email": {"dataType":"string"},
            "phoneNumber": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DataResponse_GetUsersResponseDto-Array_": {
        "dataType": "refObject",
        "properties": {
            "success": {"dataType":"boolean"},
            "statusCode": {"ref":"StatusCodes"},
            "data": {"dataType":"array","array":{"dataType":"refObject","ref":"GetUsersResponseDto"}},
            "message": {"dataType":"string"},
            "pagination": {"ref":"PaginationDataResponseModel"},
            "timestamp": {"dataType":"string"},
            "traceId": {"dataType":"string"},
            "metaData": {"dataType":"any"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GetUsersRequestDto": {
        "dataType": "refObject",
        "properties": {
            "pageNumber": {"dataType":"double","required":true},
            "pageSize": {"dataType":"double","required":true},
            "byEmailId": {"dataType":"string"},
            "byPhoneNumber": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GetUserByIdResponseDto": {
        "dataType": "refObject",
        "properties": {
            "identifier": {"dataType":"string"},
            "firstName": {"dataType":"string"},
            "lastName": {"dataType":"string"},
            "email": {"dataType":"string"},
            "phoneNumber": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DataResponse_GetUserByIdResponseDto_": {
        "dataType": "refObject",
        "properties": {
            "success": {"dataType":"boolean"},
            "statusCode": {"ref":"StatusCodes"},
            "data": {"ref":"GetUserByIdResponseDto"},
            "message": {"dataType":"string"},
            "pagination": {"ref":"PaginationDataResponseModel"},
            "timestamp": {"dataType":"string"},
            "traceId": {"dataType":"string"},
            "metaData": {"dataType":"any"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateUserResponseDto": {
        "dataType": "refObject",
        "properties": {
            "identifier": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DataResponse_CreateUserResponseDto_": {
        "dataType": "refObject",
        "properties": {
            "success": {"dataType":"boolean"},
            "statusCode": {"ref":"StatusCodes"},
            "data": {"ref":"CreateUserResponseDto"},
            "message": {"dataType":"string"},
            "pagination": {"ref":"PaginationDataResponseModel"},
            "timestamp": {"dataType":"string"},
            "traceId": {"dataType":"string"},
            "metaData": {"dataType":"any"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateUserRequestDto": {
        "dataType": "refObject",
        "properties": {
            "firstName": {"dataType":"string"},
            "lastName": {"dataType":"string"},
            "email": {"dataType":"string"},
            "password": {"dataType":"string"},
            "phoneNumber": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GetOrgByIdResponseDto": {
        "dataType": "refObject",
        "properties": {
            "identifier": {"dataType":"string"},
            "name": {"dataType":"string"},
            "businessEmail": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DataResponse_GetOrgByIdResponseDto_": {
        "dataType": "refObject",
        "properties": {
            "success": {"dataType":"boolean"},
            "statusCode": {"ref":"StatusCodes"},
            "data": {"ref":"GetOrgByIdResponseDto"},
            "message": {"dataType":"string"},
            "pagination": {"ref":"PaginationDataResponseModel"},
            "timestamp": {"dataType":"string"},
            "traceId": {"dataType":"string"},
            "metaData": {"dataType":"any"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateOrgResponseDto": {
        "dataType": "refObject",
        "properties": {
            "message": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DataResponse_CreateOrgResponseDto_": {
        "dataType": "refObject",
        "properties": {
            "success": {"dataType":"boolean"},
            "statusCode": {"ref":"StatusCodes"},
            "data": {"ref":"CreateOrgResponseDto"},
            "message": {"dataType":"string"},
            "pagination": {"ref":"PaginationDataResponseModel"},
            "timestamp": {"dataType":"string"},
            "traceId": {"dataType":"string"},
            "metaData": {"dataType":"any"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateOrgRequestDto": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string"},
            "businessEmail": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################


    
        const argsUpdatePasswordUserEndpoint_patchAsync: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
                body: {"in":"body","name":"body","required":true,"ref":"UpdateUserPasswordRequestDto"},
        };
        app.patch('/api/v1/users/:id',
            ...(fetchMiddlewares<RequestHandler>(UpdatePasswordUserEndpoint)),
            ...(fetchMiddlewares<RequestHandler>(UpdatePasswordUserEndpoint.prototype.patchAsync)),

            async function UpdatePasswordUserEndpoint_patchAsync(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUpdatePasswordUserEndpoint_patchAsync, request, response });

                const controller = new UpdatePasswordUserEndpoint();

              await templateService.apiHandler({
                methodName: 'patchAsync',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUpdateUserEndpoint_putAsync: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
                body: {"in":"body","name":"body","required":true,"ref":"UpdateUserRequestDto"},
        };
        app.put('/api/v1/users/:id',
            ...(fetchMiddlewares<RequestHandler>(UpdateUserEndpoint)),
            ...(fetchMiddlewares<RequestHandler>(UpdateUserEndpoint.prototype.putAsync)),

            async function UpdateUserEndpoint_putAsync(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUpdateUserEndpoint_putAsync, request, response });

                const controller = new UpdateUserEndpoint();

              await templateService.apiHandler({
                methodName: 'putAsync',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsRemoveUserEndpoint_deleteAsync: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.delete('/api/v1/users/:id',
            ...(fetchMiddlewares<RequestHandler>(RemoveUserEndpoint)),
            ...(fetchMiddlewares<RequestHandler>(RemoveUserEndpoint.prototype.deleteAsync)),

            async function RemoveUserEndpoint_deleteAsync(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsRemoveUserEndpoint_deleteAsync, request, response });

                const controller = new RemoveUserEndpoint();

              await templateService.apiHandler({
                methodName: 'deleteAsync',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsGetUsersEndpoint_getsAsync: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
                request: {"in":"queries","name":"request","required":true,"ref":"GetUsersRequestDto"},
        };
        app.get('/api/v1/users',
            ...(fetchMiddlewares<RequestHandler>(GetUsersEndpoint)),
            ...(fetchMiddlewares<RequestHandler>(GetUsersEndpoint.prototype.getsAsync)),

            async function GetUsersEndpoint_getsAsync(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsGetUsersEndpoint_getsAsync, request, response });

                const controller = new GetUsersEndpoint();

              await templateService.apiHandler({
                methodName: 'getsAsync',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsGetUserByIdEndpoint_getAsync: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.get('/api/v1/users/:id',
            ...(fetchMiddlewares<RequestHandler>(GetUserByIdEndpoint)),
            ...(fetchMiddlewares<RequestHandler>(GetUserByIdEndpoint.prototype.getAsync)),

            async function GetUserByIdEndpoint_getAsync(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsGetUserByIdEndpoint_getAsync, request, response });

                const controller = new GetUserByIdEndpoint();

              await templateService.apiHandler({
                methodName: 'getAsync',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsCreateUserEndpoint_postAsync: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
                body: {"in":"body","name":"body","required":true,"ref":"CreateUserRequestDto"},
        };
        app.post('/api/v1/users',
            ...(fetchMiddlewares<RequestHandler>(CreateUserEndpoint)),
            ...(fetchMiddlewares<RequestHandler>(CreateUserEndpoint.prototype.postAsync)),

            async function CreateUserEndpoint_postAsync(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsCreateUserEndpoint_postAsync, request, response });

                const controller = new CreateUserEndpoint();

              await templateService.apiHandler({
                methodName: 'postAsync',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsGetOrganizationByIdEndpoint_getAsync: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.get('/api/v1/organizations/:id',
            ...(fetchMiddlewares<RequestHandler>(GetOrganizationByIdEndpoint)),
            ...(fetchMiddlewares<RequestHandler>(GetOrganizationByIdEndpoint.prototype.getAsync)),

            async function GetOrganizationByIdEndpoint_getAsync(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsGetOrganizationByIdEndpoint_getAsync, request, response });

                const controller = new GetOrganizationByIdEndpoint();

              await templateService.apiHandler({
                methodName: 'getAsync',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsCreateOrganizationEndpoint_postAsync: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
                body: {"in":"body","name":"body","required":true,"ref":"CreateOrgRequestDto"},
        };
        app.post('/api/v1/organizations',
            ...(fetchMiddlewares<RequestHandler>(CreateOrganizationEndpoint)),
            ...(fetchMiddlewares<RequestHandler>(CreateOrganizationEndpoint.prototype.postAsync)),

            async function CreateOrganizationEndpoint_postAsync(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsCreateOrganizationEndpoint_postAsync, request, response });

                const controller = new CreateOrganizationEndpoint();

              await templateService.apiHandler({
                methodName: 'postAsync',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
