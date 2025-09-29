import { IsSafeString } from '@kishornaik/utils';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsUUID, Length, Matches } from 'class-validator';

// #region Request Dto

export class UpdateUserPasswordQueryPathRequestDto {
	@IsNotEmpty()
	@IsUUID()
	@IsSafeString()
	public id?: string;
}

export class UpdateUserPasswordRequestDto {
	@IsNotEmpty()
	@IsString()
	@IsSafeString()
	@Length(8, 20)
	@Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/, {
		message: 'Password must contain at least one letter and one number',
	})
	@Type(() => String)
	public password?: string;
}
// #endregion Request Dto

// #region Response Dto
export class UpdateUserPasswordResponseDto {
	public message?: string;
}

// #endregion Response Dto
