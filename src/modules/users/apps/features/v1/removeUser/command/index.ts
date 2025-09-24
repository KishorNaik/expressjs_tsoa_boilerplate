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
	VoidResult,
} from '@kishornaik/utils';
import { RemoveUserRequestDto, RemoveUserResponseDto } from '../contract';
import { logger } from '@/shared/utils/helpers/loggers';
import { RemoveUserDbService } from './services/db';

// #region Command
@sealed
export class RemoveUserCommand extends RequestData<DataResponse<RemoveUserResponseDto>> {
	private readonly _request: RemoveUserRequestDto;

	public constructor(request: RemoveUserRequestDto) {
		super();
		this._request = request;
	}

	public get request(): RemoveUserRequestDto {
		return this._request;
	}
}
// #endregion

// #region Pipeline Steps
enum pipelineSteps {
	DB_SERVICE = 'DbService',
}
// #endregion

// #region Command Handler
@sealed
@requestHandler(RemoveUserCommand)
export class RemoveUserCommandHandler
	implements RequestHandler<RemoveUserCommand, DataResponse<RemoveUserResponseDto>>
{
	private _pipeline = new PipelineWorkflow(logger);
	private readonly _removeUserDbService: RemoveUserDbService;

	public constructor() {
		this._removeUserDbService = Container.get(RemoveUserDbService);
	}

	public async handle(value: RemoveUserCommand): Promise<DataResponse<RemoveUserResponseDto>> {
		return await ExceptionsWrapper.tryCatchPipelineAsync(async () => {
			// Guard
			const guard = new GuardWrapper()
				.check(value, `value`)
				.check(value.request, `request`)
				.validate();

			if (guard.isErr())
				return DataResponseFactory.error(guard.error.statusCode, guard.error.message);

			// Pipeline Steps
			await this._pipeline.step(pipelineSteps.DB_SERVICE, async () => {
				return await this._removeUserDbService.handleAsync(value.request);
			});

			const response = new RemoveUserResponseDto();
			response.message = `User removed successfully.`;

			return DataResponseFactory.success(StatusCodes.OK, response, 'Success');
		});
	}
}

// #endregion
