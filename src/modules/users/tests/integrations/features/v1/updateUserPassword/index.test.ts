import request from 'supertest';
import expect from 'expect';
import { beforeEach, describe, it } from 'node:test';
import { App } from '@/app';
import { ValidateEnv } from '@kishornaik/utils';
import { UpdateUserRequestDto } from '@/modules/users/apps/features/v1/updateUser/contract';
import { UpdateUserPasswordRequestDto } from '@/modules/users/apps/features/v1/updateUserPassword/contract';

process.env.NODE_ENV = 'development';
ValidateEnv();

const appInstance = new App();
appInstance.initializeProcessExceptionHandling();
appInstance.initializeMiddlewares((app) => {});
appInstance.initializeRestApiRoutes();
appInstance.initializeErrorHandling();
const app = appInstance.getServer();

describe(`update_user_password_endpoint_integration_test`, () => {
  beforeEach(async () => {});

  /*
  Command:
  npm run build
  node --trace-deprecation --test --test-name-pattern='should_return_200_when_user_password_updated' --require ts-node/register -r tsconfig-paths/register ./src/modules/users/tests/integrations/features/v1/updateUserPassword/index.test.ts
  */
  it(`should_return_200_when_user_password_updated`, async () => {
    // Request Dto
    const requestDto = new UpdateUserPasswordRequestDto();
    requestDto.password = `@PasswordJohn123`;
    requestDto.id = crypto.randomUUID().toString();

    const endpoint = `/api/v1/users/${requestDto.id}`;

    const response = await request(app)
      .patch(endpoint)
      .send(requestDto)
      .set('Accept', 'application/json');
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
