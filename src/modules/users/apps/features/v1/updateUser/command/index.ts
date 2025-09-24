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
import { UpdateUserRequestDto, UpdateUserResponseDto } from '../contract';
import { logger } from '@/shared/utils/helpers/loggers';
import { UpdateUserDbService } from './services/db';

// #region Command
@sealed
export class UpdateUserCommand extends RequestData<DataResponse<UpdateUserResponseDto>> {
	private readonly _request: UpdateUserRequestDto;

	constructor(request: UpdateUserRequestDto) {
		super();
		this._request = request;
	}

	public get request(): UpdateUserRequestDto {
		return this._request;
	}
}
// #endregion

// #region Pipeline Steps
enum PipelineSteps {
	DB_SERVICE = 'DbService',
}
// #endregion

// #region Command Handler
@sealed
@requestHandler(UpdateUserCommand)
export class UpdateUserCommandHandler
	implements RequestHandler<UpdateUserCommand, DataResponse<UpdateUserResponseDto>>
{
	private _pipeline = new PipelineWorkflow(logger);
	private readonly _updateUserDbService: UpdateUserDbService;

	public constructor() {
		this._updateUserDbService = Container.get(UpdateUserDbService);
	}

	public async handle(value: UpdateUserCommand): Promise<DataResponse<UpdateUserResponseDto>> {
		return await ExceptionsWrapper.tryCatchPipelineAsync(async () => {
			// Guard
			const guard = new GuardWrapper()
				.check(value, `value`)
				.check(value.request, `request`)
				.validate();
			if (guard.isErr())
				return DataResponseFactory.error(StatusCodes.BAD_REQUEST, guard.error.message);

			const { request } = value;

			// Db Service Pipeline Step
			await this._pipeline.step(PipelineSteps.DB_SERVICE, async () => {
				return await this._updateUserDbService.handleAsync(request);
			});

			// Get Response
			const dbServiceResponse = this._pipeline.getResult<UpdateUserResponseDto>(
				PipelineSteps.DB_SERVICE
			);

			return DataResponseFactory.success(StatusCodes.OK, dbServiceResponse, 'Success');
		});
	}
}

// #endregion
