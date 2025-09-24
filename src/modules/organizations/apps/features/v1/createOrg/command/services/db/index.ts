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
import { CreateOrgRequestDto } from '../../../contract';

export interface ICreateOrgDbService extends IServiceHandlerVoidAsync<CreateOrgRequestDto> {}

@sealed
@Service()
export class CreateOrgDbService implements ICreateOrgDbService {
	public async handleAsync(
		params: CreateOrgRequestDto
	): Promise<Result<VoidResult, ResultError>> {
		return await ExceptionsWrapper.tryCatchResultAsync(async () => {
			// Guard
			const guard = new GuardWrapper().check(params, `params`).validate();

			if (guard.isErr()) return ResultFactory.errorInstance(guard.error);

			// Db Code
			// ...

			return ResultFactory.success(VOID_RESULT);
		});
	}
}
