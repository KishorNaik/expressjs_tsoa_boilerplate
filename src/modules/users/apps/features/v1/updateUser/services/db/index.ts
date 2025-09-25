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
import { UpdateUserRequestDto, UpdateUserResponseDto } from '../../contract';

export interface IUpdateUserDbService extends IServiceHandlerVoidAsync<UpdateUserRequestDto> {}

@sealed
@Service()
export class UpdateUserDbService implements IUpdateUserDbService {
	public async handleAsync(
		params: UpdateUserRequestDto
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
