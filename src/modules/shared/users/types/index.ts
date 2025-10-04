export interface IRegisteredClaims {
	iss?: string;
	sub?: string;
	aud?: string | string[];
	exp?: number;
	nbf?: number;
	iat?: number;
	jti?: string;
	typ?: string;
	alg?: string;
}

export interface IClaims {
	id?: string;
	firstName?: string;
	lastName?: string;
	email?: string;
	role?: string;
}

export type JWTPayload = IRegisteredClaims & IClaims;
