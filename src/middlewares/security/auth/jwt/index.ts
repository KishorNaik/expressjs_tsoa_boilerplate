import { expressjwt } from 'express-jwt';
import { Container, DataResponseFactory } from '@kishornaik/utils';
import { SECRET_KEY } from '@/config/env';
import {
	IUserTokenProviderService,
	UserTokenProviderService,
} from '@/modules/shared/users/services/jwtTokenProvider';
import { getTraceId } from '@/shared/utils/helpers/loggers';

export const authenticateJwt = expressjwt({ secret: SECRET_KEY, algorithms: ['HS256'] });

export function authorizeRole(role: string) {
	return function (req: any, res: any, next: any) {
		const traceId = getTraceId();

		const userProviderService: IUserTokenProviderService =
			Container.get(UserTokenProviderService);

		const roleFromToken = userProviderService.getUserRole(req);

		if (roleFromToken !== role) {
			const response = DataResponseFactory.response<undefined>(
				false,
				403,
				undefined,
				'Forbidden - You do not have permission to access this resource',
				undefined,
				traceId,
				undefined
			);
			return res.status(403).json(response);
		}
		next();
	};
}
