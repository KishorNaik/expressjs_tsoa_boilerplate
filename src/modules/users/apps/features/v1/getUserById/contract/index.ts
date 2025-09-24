import { Type } from 'class-transformer';
import { IsUUID } from 'class-validator';

// #region Request Dto
export class GetUserByIdRequestDto {
	@IsUUID()
	@Type(() => String)
	public id: string;
}
// #endregion

// #region Response Dto
export class GetUserByIdResponseDto {
	public identifier?: string;
	public firstName?: string;
	public lastName?: string;
	public email?: string;
	public phoneNumber?: string;
}
// #endregion
