import { workerPlugins } from '@/config/worker';
import { bullMqWorkerModules } from '@/modules/bullMq.Worker.Module';
import { bullMqRunner } from '@/shared/utils/helpers/bullMq';
import { logger } from '@/shared/utils/helpers/loggers';

if (bullMqWorkerModules?.length >= 1) {
	(async () => {
		await workerPlugins();

		bullMqWorkerModules.forEach((job) => bullMqRunner.registerWorker(job));

		await bullMqRunner.runWorkers();
		logger.info('======= ✅ BullMq workers initialized =======');
	})();
} else {
	logger.info('======= ❌ BullMq workers not found. BullMq workers not initialized =======');
}
