import {
	Container,
	DataResponse,
	DataResponseFactory,
	ExceptionsWrapper,
	GuardWrapper,
	PipelineWorkflow,
	RequestData,
	RequestHandler,
	requestHandler,
	sealed,
	StatusCodes,
} from '@kishornaik/utils';
import { GetUserByIdRequestDto, GetUserByIdResponseDto } from '../contract';
import { getTraceId, logger } from '@/shared/utils/helpers/loggers';
import { GetUserByIdDbService } from './services/db';

// #region Query
@sealed
export class GetUserByIdQuery extends RequestData<DataResponse<GetUserByIdResponseDto>> {
	private readonly _request: GetUserByIdRequestDto;

	public constructor(request: GetUserByIdRequestDto) {
		super();
		this._request = request;
	}

	public get request(): GetUserByIdRequestDto {
		return this._request;
	}
}
// #endregion

// #region Pipeline Steps
enum PipelineSteps {
	DB_SERVICE = 'DbService',
}
// #endregion

//#region Query Handler
@sealed
@requestHandler(GetUserByIdQuery)
export class GetUserByIdQueryHandler
	implements RequestHandler<GetUserByIdQuery, DataResponse<GetUserByIdResponseDto>>
{
	private _pipeline = new PipelineWorkflow(logger);
	private readonly _getUserByIdDbService: GetUserByIdDbService;

	public constructor() {
		this._getUserByIdDbService = Container.get(GetUserByIdDbService);
	}

	public async handle(value: GetUserByIdQuery): Promise<DataResponse<GetUserByIdResponseDto>> {
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

			// Db Service Pipeline Steps
			await this._pipeline.step(PipelineSteps.DB_SERVICE, async () => {
				return await this._getUserByIdDbService.handleAsync(value.request);
			});

			// Get Result
			const result = await this._pipeline.getResult<GetUserByIdResponseDto>(
				PipelineSteps.DB_SERVICE
			);

			return DataResponseFactory.success(
				StatusCodes.OK,
				result,
				'Success',
				undefined,
				traceId,
				undefined
			);
		});
	}
}
//#endregion
