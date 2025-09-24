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
	ResultFactory,
	sealed,
	StatusCodes,
} from '@kishornaik/utils';
import { CreateOrgRequestDto, CreateOrgResponseDto } from '../contract';
import { logger } from '@/shared/utils/helpers/loggers';
import { CreateOrgDbService } from './services/db';

//#region Command
@sealed
export class CreateOrgCommand extends RequestData<DataResponse<CreateOrgResponseDto>> {
	private readonly _request: CreateOrgRequestDto;

	public constructor(request: CreateOrgRequestDto) {
		super();
		this._request = request;
	}

	public get request(): CreateOrgRequestDto {
		return this._request;
	}
}
// #endregion

// #region Pipeline Steps
enum PipelineSteps {
	DB_SERVICE = 'DbService',
	RESPONSE = 'Response',
}
// #endregion

// #region Command Handler
@sealed
@requestHandler(CreateOrgCommand)
export class CreateOrgCommandHandler
	implements RequestHandler<CreateOrgCommand, DataResponse<CreateOrgResponseDto>>
{
	private _pipeline = new PipelineWorkflow(logger);
	private readonly _createOrgDbService: CreateOrgDbService;

	public constructor() {
		this._createOrgDbService = Container.get(CreateOrgDbService);
	}

	public async handle(value: CreateOrgCommand): Promise<DataResponse<CreateOrgResponseDto>> {
		return await ExceptionsWrapper.tryCatchPipelineAsync(async () => {
			// Guard
			const guard = new GuardWrapper()
				.check(value, `value`)
				.check(value.request, `request`)
				.validate();
			if (guard.isErr())
				return DataResponseFactory.error(guard.error.statusCode, guard.error.message);

			const { request } = value;

			// Db Service Pipeline Step
			await this._pipeline.step(PipelineSteps.DB_SERVICE, async () => {
				return await this._createOrgDbService.handleAsync(request);
			});

			// Response Handling
			await this._pipeline.step(PipelineSteps.RESPONSE, async () => {
				const response = new CreateOrgResponseDto();
				response.message = `Organization created successfully`;
				return ResultFactory.success(response);
			});

			// Get Response from Response Pipeline Step
			const response = this._pipeline.getResult<CreateOrgResponseDto>(PipelineSteps.RESPONSE);

			return DataResponseFactory.success(StatusCodes.CREATED, response, 'Success');
		});
	}
}

// #endregion
