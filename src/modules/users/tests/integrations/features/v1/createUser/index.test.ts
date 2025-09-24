import request from 'supertest';
import expect from 'expect';
import { beforeEach, describe, it } from 'node:test';
import { App } from '@/app';
import { ValidateEnv } from '@kishornaik/utils';
import { CreateUserRequestDto } from '@/modules/users/apps/features/v1/createUser/contract';

process.env.NODE_ENV = 'development';
ValidateEnv();

const appInstance = new App();
appInstance.initializeProcessExceptionHandling();
appInstance.initializeMiddlewares((app) => {});
appInstance.initializeRestApiRoutes();
appInstance.initializeErrorHandling();
const app = appInstance.getServer();

describe(`create_user_endpoint_integration_test`, () => {
	beforeEach(async () => {});

	/*
  Command:
  npm run build
  node --trace-deprecation --test --test-name-pattern='should_return_201_when_user_created' --require ts-node/register -r tsconfig-paths/register ./src/modules/users/tests/integrations/features/v1/createUser/index.test.ts
  */
	it(`should_return_201_when_user_created`, async () => {
		// Request Dto
		const requestDto = new CreateUserRequestDto();
		requestDto.firstName = 'john';
		requestDto.lastName = 'doe';
		requestDto.email = 'john@example.com';
		requestDto.password = `@PasswordJohn123`;
		requestDto.phoneNumber = '9161234567';

		const response = await request(app)
			.post('/api/v1/users')
			.send(requestDto)
			.set('Accept', 'application/json');
		if (response.status !== 201) {
			console.error('Response:', JSON.stringify(response.body, null, 2));
			setTimeout(() => {
				process.exit(0);
			}, 5000);
			expect(true).toBe(false);
		}

		setTimeout(() => {
			process.exit(0);
		}, 5000);
		expect(response.status).toBe(201);
	});
});
