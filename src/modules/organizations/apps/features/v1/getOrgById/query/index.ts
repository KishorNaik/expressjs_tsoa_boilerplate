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
import { logger } from '@/shared/utils/helpers/loggers';
import { GetOrgByIdRequestDto, GetOrgByIdResponseDto } from '../contract';
import { GetOrgByIdDbService } from './services/db';

// #region Query
@sealed
export class GetOrgByIdQuery extends RequestData<DataResponse<GetOrgByIdResponseDto>> {
	private readonly _request: GetOrgByIdRequestDto;

	public constructor(request: GetOrgByIdRequestDto) {
		super();
		this._request = request;
	}

	public get request(): GetOrgByIdRequestDto {
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
@requestHandler(GetOrgByIdQuery)
export class GetOrgByIdQueryHandler
	implements RequestHandler<GetOrgByIdQuery, DataResponse<GetOrgByIdResponseDto>>
{
	private _pipeline = new PipelineWorkflow(logger);
	private readonly _getOrgByIdDbService: GetOrgByIdDbService;

	public constructor() {
		this._getOrgByIdDbService = Container.get(GetOrgByIdDbService);
	}

	public async handle(value: GetOrgByIdQuery): Promise<DataResponse<GetOrgByIdResponseDto>> {
		return await ExceptionsWrapper.tryCatchPipelineAsync(async () => {
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
				return await this._getOrgByIdDbService.handleAsync(value.request);
			});

			// Get Result
			const result = await this._pipeline.getResult<GetOrgByIdResponseDto>(
				PipelineSteps.DB_SERVICE
			);

			return DataResponseFactory.success(StatusCodes.OK, result, 'Success');
		});
	}
}
//#endregion
