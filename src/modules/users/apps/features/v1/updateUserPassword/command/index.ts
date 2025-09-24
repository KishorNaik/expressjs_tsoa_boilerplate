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
import { UpdateUserPasswordRequestDto, UpdateUserPasswordResponseDto } from '../contract';
import { logger } from '@/shared/utils/helpers/loggers';
import { UpdatePasswordDbService } from './services/db';
import {
	IHashPasswordServiceResult,
	UserHashPasswordService,
} from '@/modules/users/shared/services/hashPassword';

// #region Command
@sealed
export class UpdateUserPasswordCommand extends RequestData<
	DataResponse<UpdateUserPasswordResponseDto>
> {
	private readonly _request: UpdateUserPasswordRequestDto;

	public constructor(request: UpdateUserPasswordRequestDto) {
		super();
		this._request = request;
	}

	public get request(): UpdateUserPasswordRequestDto {
		return this._request;
	}
}
//#endregion

//#region Pipeline Steps
enum pipelineSteps {
	HASH_PASSWORD_SERVICE = 'HashPasswordService',
	DB_SERVICE = 'DbService',
}
//#endregion

//#region Command Handler
@sealed
@requestHandler(UpdateUserPasswordCommand)
export class UpdateUserPasswordCommandHandler
	implements
		RequestHandler<UpdateUserPasswordCommand, DataResponse<UpdateUserPasswordResponseDto>>
{
	private _pipeline = new PipelineWorkflow(logger);
	private readonly _userHashPasswordService: UserHashPasswordService;
	private readonly _updatePasswordDbService: UpdatePasswordDbService;

	public constructor() {
		this._userHashPasswordService = Container.get(UserHashPasswordService);
		this._updatePasswordDbService = Container.get(UpdatePasswordDbService);
	}

	public async handle(
		value: UpdateUserPasswordCommand
	): Promise<DataResponse<UpdateUserPasswordResponseDto>> {
		return await ExceptionsWrapper.tryCatchPipelineAsync(async () => {
			// Guard
			const guard = new GuardWrapper()
				.check(value, `value`)
				.check(value.request, `request`)
				.validate();
			if (guard.isErr())
				return DataResponseFactory.error(guard.error.statusCode, guard.error.message);

			const { id, password } = value.request;

			// Hash Password Pipeline Step
			await this._pipeline.step(pipelineSteps.HASH_PASSWORD_SERVICE, async () => {
				return await this._userHashPasswordService.handleAsync({
					password: password,
				});
			});

			// Db Service Pipeline Step
			await this._pipeline.step(pipelineSteps.DB_SERVICE, async () => {
				const hashPasswordResult = this._pipeline.getResult<IHashPasswordServiceResult>(
					pipelineSteps.HASH_PASSWORD_SERVICE
				);
				return await this._updatePasswordDbService.handleAsync({
					newPasswordHash: hashPasswordResult.hash,
					newPasswordSalt: hashPasswordResult.salt,
					userId: id,
				});
			});

			// Response
			const response = new UpdateUserPasswordResponseDto();
			response.message = `Password updated successfully`;

			return DataResponseFactory.success(
				StatusCodes.OK,
				response,
				`Password updated successfully`
			);
		});
	}
}

//#endregion
