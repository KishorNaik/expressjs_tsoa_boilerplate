import {
	ExceptionsWrapper,
	GuardWrapper,
	IPageListResult,
	IServiceHandlerAsync,
	ISort,
	PaginationDataResponseModel,
	Result,
	ResultError,
	ResultFactory,
	sealed,
	Service,
	StatusCodes,
} from '@kishornaik/utils';
import { GetUsersRequestDto, GetUsersResponseDto } from '../../../contracts';

export interface IGetUserDbServiceParameters {
	request: GetUsersRequestDto;
	order: ISort;
}

export interface IGetUsersDbService
	extends IServiceHandlerAsync<
		IGetUserDbServiceParameters,
		IPageListResult<GetUsersResponseDto>
	> {}

@sealed
@Service()
export class GetUsersDbService implements IGetUsersDbService {
	public async handleAsync(
		params: IGetUserDbServiceParameters
	): Promise<Result<IPageListResult<GetUsersResponseDto>, ResultError>> {
		return await ExceptionsWrapper.tryCatchResultAsync(async () => {
			// Guard
			const guardResult = new GuardWrapper()
				.check(params, `params`)
				.check(params.request, `request`)
				.check(params.order, `order`)
				.validate();
			if (guardResult?.isErr())
				return ResultFactory.error(StatusCodes.BAD_REQUEST, guardResult.error.message);

			console.log(`params: ${JSON.stringify(params)}`);

			// Db Code
			// .....

			// Demo Result
			const row1 = new GetUsersResponseDto();
			row1.identifier = crypto.randomUUID().toString();
			row1.firstName = 'John';
			row1.lastName = 'Doe';
			row1.email = 'johndoe@example.com';
			row1.phoneNumber = '1234567890';

			const row2 = new GetUsersResponseDto();
			row2.identifier = crypto.randomUUID().toString();
			row2.firstName = 'Mary';
			row2.lastName = 'Doe';
			row2.email = 'marydoe@example.com';
			row2.phoneNumber = '1234567890';

			const paginationModel: PaginationDataResponseModel = new PaginationDataResponseModel();
			paginationModel.currentPage = 1;
			paginationModel.totalPages = 10;
			paginationModel.pageSize = 10;
			paginationModel.totalCount = 100;
			paginationModel.hasPrevious = false;
			paginationModel.hasNext = true;

			const result: IPageListResult<GetUsersResponseDto> = {
				items: [row1, row2],
				page: paginationModel,
			};

			return ResultFactory.success(result);
		});
	}
}
