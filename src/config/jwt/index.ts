import { JWT_ALGORITHM, JWT_AUDIENCE, JWT_ISSUER, JWT_JWKS_URI, JWT_SECRET_KEY } from '../env';

export interface JWTProviderConfigBase {
	issuer: string;
	audience: string;
	algorithm: 'RS256' | 'HS256';
}

export interface RS256Config extends JWTProviderConfigBase {
	algorithm: 'RS256';
	jwksUri: string;
}

export interface HS256Config extends JWTProviderConfigBase {
	algorithm: 'HS256';
	secret: string;
}

export type JWTProviderConfig = RS256Config | HS256Config;

const baseConfig: JWTProviderConfigBase = {
	issuer: JWT_ISSUER,
	audience: JWT_AUDIENCE,
	algorithm: JWT_ALGORITHM as 'RS256' | 'HS256',
};

const { issuer, audience, algorithm } = baseConfig;
// Narrow the type explicitly
let jwtProviderConfig: JWTProviderConfig;

if (algorithm === 'RS256') {
	jwtProviderConfig = {
		issuer,
		audience,
		algorithm, // now narrowed to "RS256"
		jwksUri: JWT_JWKS_URI!,
	};
} else {
	jwtProviderConfig = {
		issuer,
		audience,
		algorithm, // now narrowed to "HS256"
		secret: JWT_SECRET_KEY!,
	};
}

export { jwtProviderConfig };
