import {
	ExceptionsWrapper,
	GuardWrapper,
	IServiceHandlerAsync,
	Result,
	ResultError,
	ResultFactory,
	sealed,
	Service,
	StatusCodes,
} from '@kishornaik/utils';
import { GetUserByIdRequestDto, GetUserByIdResponseDto } from '../../../contract';

export interface IGetUserByIdDbService
	extends IServiceHandlerAsync<GetUserByIdRequestDto, GetUserByIdResponseDto> {}

@sealed
@Service()
export class GetUserByIdDbService implements IGetUserByIdDbService {
	public async handleAsync(
		params: GetUserByIdRequestDto
	): Promise<Result<GetUserByIdResponseDto, ResultError>> {
		return await ExceptionsWrapper.tryCatchResultAsync(async () => {
			// Guard
			const guardResult = new GuardWrapper()
				.check(params, `params`)
				.check(params.id, `id`)
				.validate();
			if (guardResult?.isErr())
				return ResultFactory.error(StatusCodes.BAD_REQUEST, guardResult.error.message);

			// Db Code
			// .......

			// Result
			const result = new GetUserByIdResponseDto();
			result.identifier = params.id;
			result.firstName = 'John';
			result.lastName = 'Doe';
			result.email = 'Z5bJ2@example.com';
			result.phoneNumber = '1234567890';

			return ResultFactory.success(result);
		});
	}
}
