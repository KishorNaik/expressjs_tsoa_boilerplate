import { traceNamespace } from '@/middlewares/loggers/trace';
import { AsyncLocalStorage } from 'async_hooks';

export namespace TraceIdWrapper {
	type TraceStore = { traceId: string };

	export const traceContext = new AsyncLocalStorage<TraceStore>();

	export function setTraceId(traceId: string): void {
		traceContext.enterWith({ traceId });
	}

	export function getTraceId(): string | undefined {
		return traceNamespace?.get('traceId') ?? traceContext.getStore()?.traceId;
	}
}
