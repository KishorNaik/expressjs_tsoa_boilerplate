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
import { CreateUserRequestDto, CreateUserResponseDto } from '../../../contract';

export interface ICreateUserDbServiceParameters {
	request: CreateUserRequestDto;
	password: {
		hash: string;
		salt: string;
	};
}

export interface ICreateUserDbService
	extends IServiceHandlerAsync<ICreateUserDbServiceParameters, CreateUserResponseDto> {}

@sealed
@Service()
export class CreateUserDbService implements ICreateUserDbService {
	public async handleAsync(
		params: ICreateUserDbServiceParameters
	): Promise<Result<CreateUserResponseDto, ResultError>> {
		return await ExceptionsWrapper.tryCatchResultAsync(async () => {
			// Guard
			const guardResult = new GuardWrapper()
				.check(params, `params`)
				.check(params.request, `request`)
				.check(params.password, `password`)
				.check(params.password.hash, `password.hash`)
				.check(params.password.salt, `password.salt`)
				.validate();
			if (guardResult?.isErr())
				return ResultFactory.error(StatusCodes.BAD_REQUEST, guardResult.error.message);

			// Db Code
			//........

			// Result
			const result: CreateUserResponseDto = new CreateUserResponseDto();
			result.identifier = crypto.randomUUID().toString();

			return ResultFactory.success(result);
		});
	}
}
