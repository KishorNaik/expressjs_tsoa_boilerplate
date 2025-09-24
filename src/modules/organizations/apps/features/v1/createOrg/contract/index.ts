import { IsSafeString } from '@kishornaik/utils';
import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

//#region Request Dto
export class CreateOrgRequestDto {
	@IsNotEmpty()
	@IsString()
	@IsSafeString()
	@Length(2, 50)
	@Type(() => String)
	public name?: string;

	@IsNotEmpty()
	@IsEmail()
	@IsSafeString()
	@Type(() => String)
	public businessEmail?: string;
}
//#endregion

// #region Response Dto
export class CreateOrgResponseDto {
	public message?: string;
}
// #endregion
