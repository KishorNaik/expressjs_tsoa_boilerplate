import { HashPasswordService } from '@/modules/shared/users/services/hashPassword';
import {
	Container,
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

export interface IHashPasswordServiceParameters {
	password: string;
}

export interface IHashPasswordServiceResult {
	hash: string;
	salt: string;
}

export interface IHashPasswordService
	extends IServiceHandlerAsync<IHashPasswordServiceParameters, IHashPasswordServiceResult> {}

@sealed
@Service()
export class UserHashPasswordService implements IHashPasswordService {
	private readonly _hashPasswordService: HashPasswordService;

	public constructor() {
		this._hashPasswordService = Container.get(HashPasswordService);
	}

	public async handleAsync(
		params: IHashPasswordServiceParameters
	): Promise<Result<IHashPasswordServiceResult, ResultError>> {
		return await ExceptionsWrapper.tryCatchResultAsync(async () => {
			// Guard
			const guardResult = new GuardWrapper()
				.check(params, `params`)
				.check(params.password, `password`)
				.validate();
			if (guardResult?.isErr())
				return ResultFactory.error(StatusCodes.BAD_REQUEST, guardResult.error.message);

			const { password } = params;

			// Hash Password
			const hashResult = await this._hashPasswordService.hashPasswordAsync(password);
			if (hashResult.isErr())
				return ResultFactory.error(hashResult.error.statusCode, hashResult.error.message);

			const { hash, salt } = hashResult.value;

			// Result
			const result: IHashPasswordServiceResult = {
				hash: hash,
				salt: salt,
			};

			return ResultFactory.success(result);
		});
	}
}
