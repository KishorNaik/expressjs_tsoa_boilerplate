import { IsSafeString } from '@kishornaik/utils';
import { Type } from 'class-transformer';
import { IsEmail, IsMobilePhone, IsNotEmpty, IsString, Length, Matches } from 'class-validator';

// #region Request Dto
export class CreateUserRequestDto {
	@IsNotEmpty()
	@IsString()
	@IsSafeString()
	@Length(3, 50)
	@Type(() => String)
	public firstName?: string;

	@IsNotEmpty()
	@IsString()
	@IsSafeString()
	@Length(3, 50)
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
	@Length(8, 20)
	@Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/, {
		message: 'Password must contain at least one letter and one number',
	})
	@Type(() => String)
	public password?: string;

	@IsNotEmpty()
	@IsString()
	@IsSafeString()
	@IsMobilePhone('en-IN', {}, { message: 'Mobile number must be a valid Indian mobile number' })
	@Type(() => String)
	public phoneNumber?: string;
}
// #endregion

// #region Response Dto
export class CreateUserResponseDto {
	public identifier?: string;
}
// #endregion
