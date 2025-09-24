import { workerPlugins } from '@/config/worker';
import { pusherWorkerModules } from '@/modules/pusher.Worker.Module';
import { logger } from '@/shared/utils/helpers/loggers';
import { pusherRunner } from '@/shared/utils/helpers/pusher';

if (pusherWorkerModules?.length >= 1) {
	(async () => {
		await workerPlugins();

		pusherWorkerModules.forEach((job) => pusherRunner.registerWorker(job));

		await pusherRunner.runWorkers();
		logger.info('======= ✅ Pusher workers initialized =======');
	})();
} else {
	logger.info('======= ❌ Pusher workers not found. Pusher workers not initialized =======');
}
