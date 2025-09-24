//import { IsSafeString, PaginationQueryStringParametersModel } from '@kishornaik/utils';
import { IsSafeString, PaginationQueryStringParametersModel } from '@kishornaik/utils';
import { Type } from 'class-transformer';
import { IsEmail, IsMobilePhone, IsOptional, IsString } from 'class-validator';

// #region Request Dto
export class GetUsersRequestDto extends PaginationQueryStringParametersModel {
	@IsOptional()
	@IsString()
	@IsSafeString()
	@IsEmail()
	@Type(() => String)
	public byEmailId?: string;

	@IsOptional()
	@IsString()
	@IsSafeString()
	@IsMobilePhone('en-IN', {}, { message: 'Mobile number must be a valid Indian mobile number' })
	@Type(() => String)
	public byPhoneNumber?: string;
}
// #endregion

// #region Response Dto
export class GetUsersResponseDto {
	public identifier?: string;
	public firstName?: string;
	public lastName?: string;
	public email?: string;
	public phoneNumber?: string;
}
// #endregion
