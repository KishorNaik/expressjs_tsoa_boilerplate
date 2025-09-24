/**
 * @description pm2 configuration file.
 * @example
 *  production mode :: pm2 start ecosystem.config.js --only prod
 *  development mode :: pm2 start ecosystem.config.js --only dev
 */
module.exports = {
	apps: [
		// === PRODUCTION API ===
		{
			name: 'prod',
			script: 'dist/server.js',
			exec_mode: 'cluster',
			instance_var: 'INSTANCE_ID',
			instances: 'max',
			autorestart: true,
			watch: false,
			ignore_watch: ['node_modules', 'logs'],
			max_memory_restart: '1G',
			merge_logs: true,
			output: './logs/pm2/api/production/debug.log',
			error: './logs/pm2/api/production/error.log',
			env: {
				NODE_ENV: 'production',
				PORT: 8080,
			},
		},

		// === DEVELOPMENT API ===
		{
			name: 'dev',
			script: 'node',
			args: '-r ts-node/register -r tsconfig-paths/register src/server.ts',
			exec_mode: 'fork',
			instance_var: 'INSTANCE_ID',
			instances: 1,
			autorestart: true,
			watch: false,
			ignore_watch: ['node_modules', 'logs'],
			max_memory_restart: '1G',
			merge_logs: true,
			output: './logs/pm2/api/development/debug.log',
			error: './logs/pm2/api/development/error.log',
			env: {
				NODE_ENV: 'development',
				PORT: 3000,
			},
		},

		{
			name: 'dev-autocannon',
			script: 'src/server.ts', // ✅ This should be your entry file
			interpreter: 'ts-node', // ✅ Use ts-node to run TypeScript
			node_args: '-r ts-node/register -r tsconfig-paths/register',
			exec_mode: 'cluster',
			instance_var: 'INSTANCE_ID',
			instances: 'max',
			autorestart: true,
			watch: false,
			ignore_watch: ['node_modules', 'logs'],
			max_memory_restart: '1G',
			merge_logs: true,
			output: './logs/pm2/api/development/debug.log',
			error: './logs/pm2/api/development/error.log',
			env: {
				NODE_ENV: 'development',
				PORT: 3000,
			},
		},

		// === PRODUCTION WORKERS ===
		{
			name: 'cron-worker',
			script: 'dist/workers/cronJob/index.js',
			exec_mode: 'fork', // or 'cluster' if it's a networked service
			instance_var: 'INSTANCE_ID',
			instances: 1,
			autorestart: true,
			watch: false,
			ignore_watch: ['node_modules', 'logs'],
			max_memory_restart: '1G',
			merge_logs: true,
			output: './logs/pm2/cron/production/debug.log',
			error: './logs/pm2/cron/production/error.log',
			env: {
				NODE_ENV: 'production',
			},
		},
		{
			name: 'bullmq-worker',
			script: 'dist/workers/bullMq/index.js',
			exec_mode: 'fork', // or 'cluster' if it's a networked service
			instance_var: 'INSTANCE_ID',
			instances: 1,
			autorestart: true,
			watch: false,
			ignore_watch: ['node_modules', 'logs'],
			max_memory_restart: '1G',
			merge_logs: true,
			output: './logs/pm2/bullMq/production/debug.log',
			error: './logs/pm2/bullMq/production/error.log',
			env: {
				NODE_ENV: 'production',
			},
		},
		{
			name: 'rabbitmq-worker',
			script: 'dist/workers/rabbitMq/index.js',
			exec_mode: 'fork', // or 'cluster' if it's a networked service
			instance_var: 'INSTANCE_ID',
			instances: 1,
			autorestart: true,
			watch: false,
			ignore_watch: ['node_modules', 'logs'],
			max_memory_restart: '1G',
			merge_logs: true,
			output: './logs/pm2/rabbitMq/production/debug.log',
			error: './logs/pm2/rabbitMq/production/error.log',
			env: {
				NODE_ENV: 'production',
			},
		},
		{
			name: 'kafka-worker',
			script: 'dist/workers/kafka/index.js',
			exec_mode: 'fork', // or 'cluster' if it's a networked service
			instance_var: 'INSTANCE_ID',
			instances: 1,
			autorestart: true,
			watch: false,
			ignore_watch: ['node_modules', 'logs'],
			max_memory_restart: '1G',
			merge_logs: true,
			output: './logs/pm2/kafka/production/debug.log',
			error: './logs/pm2/kafka/production/error.log',
			env: {
				NODE_ENV: 'production',
			},
		},
		{
			name: 'pusher-worker',
			script: 'dist/workers/pusher/index.js',
			exec_mode: 'fork', // or 'cluster' if it's a networked service
			instance_var: 'INSTANCE_ID',
			instances: 1,
			autorestart: true,
			watch: false,
			ignore_watch: ['node_modules', 'logs'],
			max_memory_restart: '1G',
			merge_logs: true,
			output: './logs/pm2/pusher/production/debug.log',
			error: './logs/pm2/pusher/production/error.log',
			env: {
				NODE_ENV: 'production',
			},
		},

		// === DEVELOPMENT WORKERS ===
		{
			name: 'cron-worker-dev',
			script: 'node',
			args: '-r ts-node/register -r tsconfig-paths/register src/workers/cronJob/index.ts',
			exec_mode: 'fork', // or 'cluster' if it's a networked service
			instance_var: 'INSTANCE_ID',
			instances: 1,
			autorestart: true,
			watch: false,
			ignore_watch: ['node_modules', 'logs'],
			max_memory_restart: '1G',
			merge_logs: true,
			output: './logs/pm2/cronJob/development/debug.log',
			error: './logs/pm2/cronJob/development/error.log',
			env: {
				NODE_ENV: 'development',
			},
		},
		{
			name: 'bullmq-worker-dev',
			script: 'node',
			args: '-r ts-node/register -r tsconfig-paths/register src/workers/bullMq/index.ts',
			exec_mode: 'fork', // or 'cluster' if it's a networked service
			instance_var: 'INSTANCE_ID',
			instances: 1,
			autorestart: true,
			watch: false,
			ignore_watch: ['node_modules', 'logs'],
			max_memory_restart: '1G',
			merge_logs: true,
			output: './logs/pm2/bullMq/development/debug.log',
			error: './logs/pm2/bullMq/development/error.log',
			env: {
				NODE_ENV: 'development',
			},
		},
		{
			name: 'rabbitmq-worker-dev',
			script: 'node',
			args: '-r ts-node/register -r tsconfig-paths/register src/workers/rabbitMq/index.ts',
			exec_mode: 'fork', // or 'cluster' if it's a networked service
			instance_var: 'INSTANCE_ID',
			instances: 1,
			autorestart: true,
			watch: false,
			ignore_watch: ['node_modules', 'logs'],
			max_memory_restart: '1G',
			merge_logs: true,
			output: './logs/pm2/rabbitMq/development/debug.log',
			error: './logs/pm2/rabbitMq/development/error.log',
			env: {
				NODE_ENV: 'development',
			},
		},
		{
			name: 'kafka-worker-dev',
			script: 'node',
			args: '-r ts-node/register -r tsconfig-paths/register src/workers/kafka/index.ts',
			exec_mode: 'fork', // or 'cluster' if it's a networked service
			instance_var: 'INSTANCE_ID',
			instances: 1,
			autorestart: true,
			watch: false,
			ignore_watch: ['node_modules', 'logs'],
			max_memory_restart: '1G',
			merge_logs: true,
			output: './logs/pm2/kafka/development/debug.log',
			error: './logs/pm2/kafka/development/error.log',
			env: {
				NODE_ENV: 'development',
			},
		},
		{
			name: 'pusher-worker-dev',
			script: 'node',
			args: '-r ts-node/register -r tsconfig-paths/register src/workers/pusher/index.ts',
			exec_mode: 'fork', // or 'cluster' if it's a networked service
			instance_var: 'INSTANCE_ID',
			instances: 1,
			autorestart: true,
			watch: false,
			ignore_watch: ['node_modules', 'logs'],
			max_memory_restart: '1G',
			merge_logs: true,
			output: './logs/pm2/pusher/development/debug.log',
			error: './logs/pm2/pusher/development/error.log',
			env: {
				NODE_ENV: 'development',
			},
		},
	],
};
