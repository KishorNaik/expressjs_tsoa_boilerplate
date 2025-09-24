import { workerPlugins } from '@/config/worker';
import { rabbitMqWorkerModules } from '@/modules/rabbitMq.Worker.Module';
import { logger } from '@/shared/utils/helpers/loggers';
import { rabbitMQRunner } from '@/shared/utils/helpers/rabbitmq';

if (rabbitMqWorkerModules?.length >= 1) {
	(async () => {
		await workerPlugins();

		rabbitMqWorkerModules.forEach((job) => rabbitMQRunner.registerWorker(job));

		await rabbitMQRunner.runWorkers();
		logger.info('======= ✅ RabbitMq workers initialized =======');
	})();
} else {
	logger.info('======= ❌ RabbitMq workers not found. RabbitMq workers not initialized =======');
}
