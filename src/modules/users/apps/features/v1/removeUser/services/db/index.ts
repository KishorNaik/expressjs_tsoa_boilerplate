import {
	ExceptionsWrapper,
	GuardWrapper,
	IServiceHandlerAsync,
	IServiceHandlerVoidAsync,
	Result,
	ResultError,
	ResultFactory,
	sealed,
	Service,
	VOID_RESULT,
	VoidResult,
} from '@kishornaik/utils';
import { RemoveUserRequestDto } from '../../contract';

export interface IRemoveUserDbService extends IServiceHandlerVoidAsync<RemoveUserRequestDto> {}

@sealed
@Service()
export class RemoveUserDbService implements IRemoveUserDbService {
	public async handleAsync(
		params: RemoveUserRequestDto
	): Promise<Result<VoidResult, ResultError>> {
		return await ExceptionsWrapper.tryCatchResultAsync(async () => {
			// Guard
			const guard = new GuardWrapper().check(params, `params`).validate();

			if (guard.isErr()) return ResultFactory.errorInstance(guard.error);

			// Db Code
			// ......

			return ResultFactory.success(VOID_RESULT);
		});
	}
}
