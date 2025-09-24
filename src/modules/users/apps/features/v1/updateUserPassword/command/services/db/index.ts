import {
	ExceptionsWrapper,
	GuardWrapper,
	IServiceHandlerVoidAsync,
	Result,
	ResultError,
	ResultFactory,
	sealed,
	Service,
	VOID_RESULT,
	VoidResult,
} from '@kishornaik/utils';

export interface IUpdatePasswordDbServiceParameters {
	userId: string;
	newPasswordHash: string;
	newPasswordSalt: string;
}

export interface IUpdatePasswordDbService
	extends IServiceHandlerVoidAsync<IUpdatePasswordDbServiceParameters> {}

@sealed
@Service()
export class UpdatePasswordDbService implements IUpdatePasswordDbService {
	public async handleAsync(
		params: IUpdatePasswordDbServiceParameters
	): Promise<Result<VoidResult, ResultError>> {
		return await ExceptionsWrapper.tryCatchResultAsync(async () => {
			// Guard
			const guard = new GuardWrapper()
				.check(params, `params`)
				.check(params.userId, `userId`)
				.check(params.newPasswordHash, `newPasswordHash`)
				.check(params.newPasswordSalt, `newPasswordSalt`)
				.validate();

			if (guard.isErr()) return ResultFactory.errorInstance(guard.error);

			// Db Code
			// ......

			return ResultFactory.success(VOID_RESULT);
		});
	}
}
