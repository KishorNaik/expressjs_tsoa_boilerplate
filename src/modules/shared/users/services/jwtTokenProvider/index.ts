import { Request } from 'express';
import { Service } from '@kishornaik/utils';
import { IClaims, JWTPayload } from '../../types';
import { jwtDecode } from 'jwt-decode';

export interface IUserTokenProviderService {
	getUserId(request: Request): string;
	getUserIdByJwtToken(accessOrRefreshToken: string): string;
	getUserRole(request: Request): string;
	getUserRoleByJwtToken(accessOrRefreshToken: string): string;
	getJwtPayloadByRequest(request: Request): JWTPayload;
	getJwtPayloadByJwtToken(accessOrRefreshToken: string): JWTPayload;
	getClaimsByRequest(request: Request): IClaims;
	getClaimsByJwtToken(accessOrRefreshToken: string): IClaims;
	getUserEmail(request: Request): string;
	getUserEmailByJwtToken(accessOrRefreshToken: string): string;
}

@Service()
export class UserTokenProviderService implements IUserTokenProviderService {
	public getUserEmail(request: Request): string {
		const token = request.headers.authorization?.split(' ')[1];
		const decoded = jwtDecode<IClaims>(token);
		return decoded.email;
	}
	public getUserEmailByJwtToken(accessOrRefreshToken: string): string {
		const decoded = jwtDecode<IClaims>(accessOrRefreshToken);
		return decoded.email;
	}
	public getClaimsByRequest(request: Request): IClaims {
		const token = request.headers.authorization?.split(' ')[1];
		return jwtDecode<JWTPayload>(token);
	}
	public getClaimsByJwtToken(accessOrRefreshToken: string): IClaims {
		const decoded = jwtDecode<JWTPayload>(accessOrRefreshToken);
		return decoded;
	}
	public getJwtPayloadByRequest(request: Request): JWTPayload {
		const token = request.headers.authorization?.split(' ')[1];
		return jwtDecode<JWTPayload>(token);
	}

	public getJwtPayloadByJwtToken(accessOrRefreshToken: string): JWTPayload {
		const decoded = jwtDecode<JWTPayload>(accessOrRefreshToken);
		return decoded;
	}

	public getUserIdByJwtToken(accessOrRefreshToken: string): string {
		const decoded = jwtDecode<IClaims>(accessOrRefreshToken);
		return decoded.id;
	}

	public getUserRoleByJwtToken(accessOrRefreshToken: string): string {
		const decoded = jwtDecode<IClaims>(accessOrRefreshToken);
		return decoded.role ?? '';
	}

	public getUserId(request: Request): string {
		const token = request.headers.authorization?.split(' ')[1];
		const decoded = jwtDecode<IClaims>(token);
		return decoded.id;
	}

	public getUserRole(request: Request): string {
		const token = request.headers.authorization?.split(' ')[1];
		const decoded = jwtDecode<IClaims>(token);
		return decoded.role ?? '';
	}
}
