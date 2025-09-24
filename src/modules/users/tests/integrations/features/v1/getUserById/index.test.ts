import request from 'supertest';
import expect from 'expect';
import { beforeEach, describe, it } from 'node:test';
import { App } from '@/app';
import { ValidateEnv } from '@kishornaik/utils';
import { GetUserByIdRequestDto } from '@/modules/users/apps/features/v1/getUserById/contract';

process.env.NODE_ENV = 'development';
ValidateEnv();

const appInstance = new App();
appInstance.initializeProcessExceptionHandling();
appInstance.initializeMiddlewares((app) => {});
appInstance.initializeRestApiRoutes();
appInstance.initializeErrorHandling();
const app = appInstance.getServer();

describe(`get_user_by_id_endpoint_integration_test`, () => {
	beforeEach(async () => {});

	/*
  Command:
  npm run build
  node --trace-deprecation --test --test-name-pattern='should_return_200_when_user_found' --require ts-node/register -r tsconfig-paths/register ./src/modules/users/tests/integrations/features/v1/getUserById/index.test.ts
  */
	it(`should_return_200_when_user_found`, async () => {
		// Request Dto
		const requestDto = new GetUserByIdRequestDto();
		requestDto.id = crypto.randomUUID().toString();

		// Endpoint
		const endpoint = `/api/v1/users/${requestDto.id}`;

		const response = await request(app).get(endpoint).set('Accept', 'application/json');
		if (response.status !== 200) {
			console.error('Response:', JSON.stringify(response.body, null, 2));
			setTimeout(() => {
				process.exit(0);
			}, 5000);
			expect(true).toBe(false);
		}

		setTimeout(() => {
			process.exit(0);
		}, 5000);
		expect(response.status).toBe(200);
	});
});
