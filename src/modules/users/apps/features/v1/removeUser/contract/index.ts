import { IsNotEmpty, IsUUID } from 'class-validator';

// #region Request Dto
export class RemoveUserRequestDto {
	@IsNotEmpty()
	@IsUUID()
	public id?: string;
}
// #endregion

// #region Response Dto
export class RemoveUserResponseDto {
	message?: string;
}
// #endregion
