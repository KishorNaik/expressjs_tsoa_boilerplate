import {
	ExceptionsWrapper,
	GuardWrapper,
	IServiceHandlerAsync,
	Result,
	ResultError,
	ResultFactory,
	sealed,
	Service,
} from '@kishornaik/utils';
import { UpdateUserRequestDto, UpdateUserResponseDto } from '../../../contract';

export interface IUpdateUserDbService
	extends IServiceHandlerAsync<UpdateUserRequestDto, UpdateUserResponseDto> {}

@sealed
@Service()
export class UpdateUserDbService implements IUpdateUserDbService {
	public async handleAsync(
		params: UpdateUserRequestDto
	): Promise<Result<UpdateUserResponseDto, ResultError>> {
		return await ExceptionsWrapper.tryCatchResultAsync(async () => {
			// Guard
			const guard = new GuardWrapper().check(params, `params`).validate();

			if (guard.isErr()) return ResultFactory.errorInstance(guard.error);

			// Db Code
			// ......

			const response = new UpdateUserResponseDto();
			response.identifier = params.id;

			return ResultFactory.success(response);
		});
	}
}
