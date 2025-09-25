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
import { GetOrgByIdRequestDto, GetOrgByIdResponseDto } from '../../contract';

export interface IGetOrgByIdDbService
	extends IServiceHandlerAsync<GetOrgByIdRequestDto, GetOrgByIdResponseDto> {}

@sealed
@Service()
export class GetOrgByIdDbService implements IGetOrgByIdDbService {
	public async handleAsync(
		params: GetOrgByIdRequestDto
	): Promise<Result<GetOrgByIdResponseDto, ResultError>> {
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
			const result = new GetOrgByIdResponseDto();
			result.identifier = params.id;
			result.name = 'Test Organization';
			result.businessEmail = 'test@example.com';

			return ResultFactory.success(result);
		});
	}
}
