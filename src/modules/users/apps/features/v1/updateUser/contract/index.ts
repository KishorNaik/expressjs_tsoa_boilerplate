import { IsSafeString } from '@kishornaik/utils';
import { Type } from 'class-transformer';
import { IsEmail, IsMobilePhone, IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';

// #region Request Dto
export class UpdateUserRequestDto {
	@IsNotEmpty()
	@IsUUID()
	@IsSafeString()
	public id?: string;

	@IsNotEmpty()
	@IsString()
	@IsSafeString()
	@Length(2, 50)
	@Type(() => String)
	public firstName?: string;

	@IsNotEmpty()
	@IsString()
	@IsSafeString()
	@Length(2, 50)
	@Type(() => String)
	public lastName?: string;

	@IsNotEmpty()
	@IsEmail()
	@IsSafeString()
	@Type(() => String)
	public email?: string;

	@IsNotEmpty()
	@IsString()
	@IsSafeString()
	@IsMobilePhone('en-IN', {}, { message: 'Mobile number must be a valid Indian mobile number' })
	@Type(() => String)
	public phoneNumber?: string;
}
// #endregion

// #region Response Dto
export class UpdateUserResponseDto {
	public identifier?: string;
}
// #endregion
