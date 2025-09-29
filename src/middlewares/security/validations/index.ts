import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { DataResponseFactory } from '@kishornaik/utils';
import { getTraceId } from '@/shared/utils/helpers/loggers';

type ValidationSources = {
	body?: new () => any;
	params?: new () => any;
	query?: new () => any;
	headers?: new () => any;
};

interface ValidationOptions {
	skipMissingProperties?: boolean;
	whitelist?: boolean;
	forbidNonWhitelisted?: boolean;
}

export const ValidationMiddleware = (
	sources: ValidationSources,
	options: ValidationOptions = {
		skipMissingProperties: false,
		whitelist: true,
		forbidNonWhitelisted: true,
	}
) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		const traceId = getTraceId();
		const errorMessages: string[] = [];

		const validations = await Promise.all(
			Object.entries(sources).map(async ([key, dto]) => {
				if (!dto || typeof dto !== 'function') return [];

				try {
					const input = plainToInstance(dto, req[key as keyof Request]);
					const errors = await validate(input, options);
					return errors;
				} catch (err) {
					return [
						{
							property: key,
							constraints: {
								invalidDto: `Validation failed for '${key}': invalid DTO or transformation error.`,
							},
						} as ValidationError,
					];
				}
			})
		);

		validations.flat().forEach((error) => {
			if (error.constraints) {
				errorMessages.push(...Object.values(error.constraints));
			} else {
				errorMessages.push(`Unexpected property '${error.property}' is not allowed`);
			}
		});

		if (errorMessages.length > 0) {
			const message = errorMessages.join(', ');
			const response = DataResponseFactory.response(
				false,
				400,
				undefined,
				message,
				undefined,
				traceId,
				undefined
			);
			return next(response);
		}

		next();
	};
};
