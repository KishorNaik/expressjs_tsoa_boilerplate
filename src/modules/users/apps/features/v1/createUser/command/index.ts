import {
	RequestData,
	sealed,
	StatusCodes,
	DataResponse,
	requestHandler,
	RequestHandler,
	DataResponseFactory,
	PipelineWorkflowException,
	PipelineWorkflow,
	Container,
	AesResponseDto,
	AesRequestDto,
	TransactionsWrapper,
	defineParallelSteps,
	defineParallelStep,
	GuardWrapper,
	IAesEncryptResult,
	FireAndForgetWrapper,
	ResultFactory,
	delay,
	ExceptionsWrapper,
} from '@kishornaik/utils';
import {
	UserHashPasswordService,
	IHashPasswordServiceResult,
} from '../../../../../shared/services/hashPassword';
import { CreateUserRequestDto, CreateUserResponseDto } from '../contract';
import { getTraceId, logger } from '@/shared/utils/helpers/loggers';
import { CreateUserDbService } from './services/db';

// #region Command
@sealed
export class CreateUserCommand extends RequestData<DataResponse<CreateUserResponseDto>> {
	private readonly _request: CreateUserRequestDto;

	constructor(request: CreateUserRequestDto) {
		super();
		this._request = request;
	}

	public get request(): CreateUserRequestDto {
		return this._request;
	}
}

//#endregion

// #region Pipeline Workflow
enum pipelineSteps {
	HASH_PASSWORD_SERVICE = 'HashPasswordService',
	DB_SERVICE = 'DbService',
}
// #endregion

// #region Command Handler
@sealed
@requestHandler(CreateUserCommand)
export class CreateUserCommandHandler
	implements RequestHandler<CreateUserCommand, DataResponse<CreateUserResponseDto>>
{
	private _pipeline = new PipelineWorkflow(logger);
	private readonly _hashPasswordService: UserHashPasswordService;
	private readonly _createUserDbService: CreateUserDbService;

	public constructor() {
		this._hashPasswordService = Container.get(UserHashPasswordService);
		this._createUserDbService = Container.get(CreateUserDbService);
	}

	public async handle(value: CreateUserCommand): Promise<DataResponse<CreateUserResponseDto>> {
		return await ExceptionsWrapper.tryCatchPipelineAsync(async () => {
			const { request } = value;

			// Get traceId
			const traceId = getTraceId();

			// Guard checks
			const guardResult = new GuardWrapper()
				.check(value, `value`)
				.check(request, `request`)
				.validate();
			if (guardResult?.isErr())
				return DataResponseFactory.error(
					StatusCodes.BAD_REQUEST,
					guardResult.error.message
				);

			// Hash Password Pipeline Step
			await this._pipeline.step(pipelineSteps.HASH_PASSWORD_SERVICE, async () => {
				return await this._hashPasswordService.handleAsync({
					password: request.password,
				});
			});

			// Db Service Pipeline Step
			await this._pipeline.step(pipelineSteps.DB_SERVICE, async () => {
				// Get Hash Password from the Pipeline
				const hashPasswordResult =
					await this._pipeline.getResult<IHashPasswordServiceResult>(
						pipelineSteps.HASH_PASSWORD_SERVICE
					);

				return await this._createUserDbService.handleAsync({
					request: request,
					password: {
						hash: hashPasswordResult.hash,
						salt: hashPasswordResult.salt,
					},
				});
			});

			// Get Response from the Pipeline
			const response = await this._pipeline.getResult<CreateUserResponseDto>(
				pipelineSteps.DB_SERVICE
			);

			return DataResponseFactory.success(
				StatusCodes.CREATED,
				response,
				'User created successfully',
				undefined,
				traceId,
				undefined
			);
		});
	}
}
//#endregion
