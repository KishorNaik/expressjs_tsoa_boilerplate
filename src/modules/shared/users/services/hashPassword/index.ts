import { Err, Ok, Result, saltRounds, Service, StatusCodes, bcrypt } from '@kishornaik/utils';
import { ResultError, ResultFactory } from '@kishornaik/utils';

export interface IHashPasswordResult {
	hash: string;
	salt: string;
}

export interface IHashPasswordService {
	hashPasswordAsync(password: string): Promise<Result<IHashPasswordResult, ResultError>>;
	comparePasswordAsync(
		password: string,
		hashedPassword: string
	): Promise<Result<boolean, ResultError>>;
}

@Service()
export class HashPasswordService implements IHashPasswordService {
	public async hashPasswordAsync(
		password: string
	): Promise<Result<IHashPasswordResult, ResultError>> {
		try {
			const salt = await bcrypt.genSalt();
			const hashedPassword = await bcrypt.hash(password, salt ?? saltRounds);

			if (!hashedPassword)
				return ResultFactory.error(
					StatusCodes.INTERNAL_SERVER_ERROR,
					'Error while hashing password'
				);

			const result: IHashPasswordResult = {
				hash: hashedPassword,
				salt: salt,
			};

			return ResultFactory.success(result);
		} catch (ex) {
			const error = ex as Error;
			return ResultFactory.error(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
		}
	}

	public async comparePasswordAsync(
		password: string,
		hashedPassword: string
	): Promise<Result<boolean, ResultError>> {
		try {
			const match = await bcrypt.compare(password, hashedPassword);

			if (!match)
				return ResultFactory.error(
					StatusCodes.INTERNAL_SERVER_ERROR,
					'Error while comparing password'
				);

			return ResultFactory.success(match);
		} catch (ex) {
			const error = ex as Error;
			return ResultFactory.error(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
		}
	}
}
