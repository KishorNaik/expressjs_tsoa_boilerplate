import { workerPlugins } from '@/config/worker';
import { kafkaWorkerModules } from '@/modules/kafka.Worker.Module';
import { kafkaRunner } from '@/shared/utils/helpers/kafka';
import { logger } from '@/shared/utils/helpers/loggers';

if (kafkaWorkerModules?.length >= 1) {
	(async () => {
		await workerPlugins();

		kafkaWorkerModules.forEach((job) => kafkaRunner.registerWorker(job));

		await kafkaRunner.runWorkers();
		logger.info('======= ✅ Kafka workers initialized =======');
	})();
} else {
	logger.info('======= ❌ Kafka workers not found. Kafka workers not initialized =======');
}
