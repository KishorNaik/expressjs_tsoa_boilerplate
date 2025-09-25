import request from 'supertest';
import expect from 'expect';
import { beforeEach, describe, it } from 'node:test';
import { App } from '@/app';
import { ValidateEnv } from '@kishornaik/utils';
import { RemoveUserRequestDto } from '@/modules/users/apps/features/v1/removeUser/contract';

process.env.NODE_ENV = 'development';
ValidateEnv();

const appInstance = new App();
appInstance.initializeProcessExceptionHandling();
appInstance.initializeMiddlewares((app) => {});
appInstance.initializeRestApiRoutes();
appInstance.initializeErrorHandling();
const app = appInstance.getServer();

describe(`remove_user_endpoint_integration_test`, () => {
	beforeEach(async () => {});

	/*
  Command:
  npm run build
  node --trace-deprecation --test --test-name-pattern='should_return_200_when_user_removed' --require ts-node/register -r tsconfig-paths/register ./src/modules/users/tests/integrations/features/v1/removeUser/index.test.ts
  */
	it(`should_return_200_when_user_removed`, async () => {
		// Request Dto
		const requestDto = new RemoveUserRequestDto();
		requestDto.id = crypto.randomUUID().toString();

		const endpoint = `/api/v1/users/${requestDto.id}`;

		const response = await request(app).delete(endpoint).set('Accept', 'application/json');
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
