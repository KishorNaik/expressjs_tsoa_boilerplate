import { Type } from 'class-transformer';
import { IsUUID } from 'class-validator';

// #region Request Dto
export class GetOrgByIdRequestDto {
	@IsUUID()
	@Type(() => String)
	public id: string;
}
// #endregion

// #region Response Dto
export class GetOrgByIdResponseDto {
	public identifier?: string;
	public name?: string;
	public businessEmail?: string;
}
// #endregion
