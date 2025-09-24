import request from 'supertest';
import expect from 'expect';
import { beforeEach, describe, it } from 'node:test';
import { App } from '@/app';
import { ValidateEnv } from '@kishornaik/utils';
import { CreateOrgRequestDto } from '@/modules/organizations/apps/features/v1/createOrg/contract';

process.env.NODE_ENV = 'development';
ValidateEnv();

const appInstance = new App();
appInstance.initializeProcessExceptionHandling();
appInstance.initializeMiddlewares((app) => {});
appInstance.initializeRestApiRoutes();
appInstance.initializeErrorHandling();
const app = appInstance.getServer();

describe(`create_org_endpoint_integration_test`, () => {
	beforeEach(async () => {});

	/*
  Command:
  npm run build
  node --trace-deprecation --test --test-name-pattern='should_return_201_when_org_created' --require ts-node/register -r tsconfig-paths/register ./src/modules/organizations/tests/integrations/features/v1/createOrg/index.test.ts
  */
	it(`should_return_201_when_org_created`, async () => {
		// Request Dto
		const requestDto = new CreateOrgRequestDto();
    requestDto.name = 'John Doe';
    requestDto.businessEmail = 'john@example.com';

		const response = await request(app)
			.post('/api/v1/organizations')
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
