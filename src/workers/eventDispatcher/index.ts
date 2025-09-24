import { eventDispatcherWorkerModules } from '@/modules/eventDispatcher.Worker.Module';
import { eventDispatcherRunner } from '@/shared/utils/helpers/eventDispatcher';
import { logger } from '@/shared/utils/helpers/loggers';

export const runEventDispatcherWorker = async () => {
	if (eventDispatcherWorkerModules?.length >= 1) {
		eventDispatcherWorkerModules.forEach((job) => eventDispatcherRunner.registerWorker(job));

		await eventDispatcherRunner.runWorkers();
		logger.info('======= ✅ EventDispatcher workers initialized =======');
	} else {
		logger.info(
			'======= ❌ EventDispatcher workers not found. EventDispatcher workers not initialized ======='
		);
	}
};
