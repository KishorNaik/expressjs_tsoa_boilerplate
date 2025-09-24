import {
	Container,
	DataResponse,
	DataResponseFactory,
	ExceptionsWrapper,
	getPropertyNameByType,
	GuardWrapper,
	IPageListResult,
	Order,
	PipelineWorkflow,
	RequestData,
	RequestHandler,
	requestHandler,
	sealed,
	StatusCodes,
} from '@kishornaik/utils';
import { GetUsersRequestDto, GetUsersResponseDto } from '../contracts';
import { getTraceId, logger } from '@/shared/utils/helpers/loggers';
import { GetUsersDbService } from './services/db';

// #region Query
@sealed
export class GetUsersQuery extends RequestData<DataResponse<Array<GetUsersResponseDto>>> {
	private readonly _request: GetUsersRequestDto;
	public constructor(request: GetUsersRequestDto) {
		super();
		this._request = request;
	}

	public get request(): GetUsersRequestDto {
		return this._request;
	}
}
// #endregion

// #region Pipeline Steps
enum PipelineSteps {
	DB_SERVICE = 'DbService',
}
// #endregion

// #region Query Handler
@sealed
@requestHandler(GetUsersQuery)
export class GetUserQueryHandler
	implements RequestHandler<GetUsersQuery, DataResponse<Array<GetUsersResponseDto>>>
{
	private _pipeline = new PipelineWorkflow(logger);
	private readonly _getUsersDbService: GetUsersDbService;

	public constructor() {
		this._getUsersDbService = Container.get(GetUsersDbService);
	}

	public async handle(value: GetUsersQuery): Promise<DataResponse<GetUsersResponseDto[]>> {
		return await ExceptionsWrapper.tryCatchPipelineAsync(async () => {
			// Get traceId
			const traceId = getTraceId();

			// Guard
			const guardResult = new GuardWrapper()
				.check(value, `value`)
				.check(value.request, `request`)
				.validate();
			if (guardResult?.isErr())
				return DataResponseFactory.error(
					StatusCodes.BAD_REQUEST,
					guardResult.error.message
				);

			const { request } = value;

			// Get Users
			await this._pipeline.step(PipelineSteps.DB_SERVICE, async () => {
				return await this._getUsersDbService.handleAsync({
					request: request,
					order: {
						by: [
							getPropertyNameByType<GetUsersRequestDto>('byEmailId'),
							getPropertyNameByType<GetUsersRequestDto>('byPhoneNumber'),
						],
						direction: Order.DESC,
					},
				});
			});

			// Response
			const result = await this._pipeline.getResult<IPageListResult<GetUsersResponseDto>>(
				PipelineSteps.DB_SERVICE
			);

			return DataResponseFactory.success(
				StatusCodes.OK,
				result.items,
				'Success',
				result.page,
				traceId,
				undefined
			);
		});
	}
}
// #endregion
