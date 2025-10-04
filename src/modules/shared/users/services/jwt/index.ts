import { JWT_AUDIENCE, JWT_ISSUER, JWT_SECRET_KEY, REFRESH_SECRET_KEY } from '@/config/env';
import jwt from 'jsonwebtoken';
import {
	Container,
	Err,
	IServiceHandlerAsync,
	Ok,
	Result,
	ResultError,
	ResultFactory,
	Service,
	StatusCodes,
} from '@kishornaik/utils';
import { IClaims, JWTPayload } from '../../types';

export type tokenTuples = [accessToken: string, refreshToken: string];

export interface IJwtService {
	generateTokenAsync(claims: IClaims): Promise<string>;
	generateRefreshTokenAsync(claims: IClaims): Promise<string>;
	getClaimsFromRefreshTokenAsync(refreshToken: string): Promise<IClaims>;
	getClaimsFromAccessTokenAsync(accessToken: string): Promise<IClaims>;
}

@Service()
export class JwtService implements IJwtService {
	private buildPayload(claims: IClaims, expiresInSeconds: number): JWTPayload {
		const now = Math.floor(Date.now() / 1000);
		return {
			...claims,
			iss: JWT_ISSUER,
			aud: JWT_AUDIENCE,
			sub: claims.id,
			iat: now,
			exp: now + expiresInSeconds,
			typ: 'JWT',
			alg: 'HS256',
		};
	}

	public async generateTokenAsync(claims: IClaims): Promise<string> {
		const payload = this.buildPayload(claims, 3600); // 1 hour
		return jwt.sign(payload, JWT_SECRET_KEY, { algorithm: 'HS256' });
	}

	public async generateRefreshTokenAsync(claims: IClaims): Promise<string> {
		const payload = this.buildPayload(claims, 7 * 24 * 3600); // 7 days
		return jwt.sign(payload, REFRESH_SECRET_KEY, { algorithm: 'HS256' });
	}

	public async getClaimsFromRefreshTokenAsync(refreshToken: string): Promise<IClaims> {
		const decoded = jwt.verify(refreshToken, REFRESH_SECRET_KEY) as JWTPayload;
		return decoded;
	}

	public async getClaimsFromAccessTokenAsync(accessToken: string): Promise<IClaims> {
		const decoded = jwt.verify(accessToken, JWT_SECRET_KEY) as JWTPayload;
		return decoded;
	}
}

export interface IJwtExtendedService extends IServiceHandlerAsync<IClaims, tokenTuples> {}

@Service()
export class JwtExtendedService implements IJwtExtendedService {
	private readonly jwtService: IJwtService;

	public constructor() {
		this.jwtService = Container.get(JwtService);
	}
	public async handleAsync(params: IClaims): Promise<Result<tokenTuples, ResultError>> {
		try {
			const generateJwtTokenPromise = this.jwtService.generateTokenAsync(params);

			const generateRefreshTokenPromise = this.jwtService.generateRefreshTokenAsync(params);

			const [generateJwtTokenResult, generateRefreshTokenResult] = await Promise.all([
				generateJwtTokenPromise,
				generateRefreshTokenPromise,
			]);

			if (!generateJwtTokenResult)
				return ResultFactory.error(
					StatusCodes.INTERNAL_SERVER_ERROR,
					'jwt token generation error'
				);

			if (!generateRefreshTokenResult)
				return ResultFactory.error(
					StatusCodes.INTERNAL_SERVER_ERROR,
					'refresh token generation error'
				);

			const tokensValue: tokenTuples = [generateJwtTokenResult, generateRefreshTokenResult];

			return ResultFactory.success(tokensValue);
		} catch (ex) {
			const error = ex as Error;
			return ResultFactory.error(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
		}
	}
}
