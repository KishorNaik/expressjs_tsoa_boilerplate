import { workerPlugins } from '@/config/worker';
import { cronJobWorkerModules } from '@/modules/cronJob.Worker.Module';
import { cronJobRunner } from '@/shared/utils/helpers/cronJob';
import { logger } from '@/shared/utils/helpers/loggers';

if (cronJobWorkerModules?.length >= 1) {
	(async () => {
		await workerPlugins();

		cronJobWorkerModules.forEach((job) => cronJobRunner.registerWorker(job));

		await cronJobRunner.runWorkers();
		logger.info('======= ✅ Cron job workers initialized =======');
	})();
} else {
	logger.info('======= ❌ Cron job workers not found. Cron job workers not initialized =======');
}
