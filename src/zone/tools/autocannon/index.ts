/*
Command:
npx ts-node-dev --inspect=4321 --pretty --transpile-only -r tsconfig-paths/register src/zone/tools/autocannon/index.ts
*/
import autocannon from 'autocannon';

const instance = autocannon(
	{
		title: 'Autocannon Test',
		connections: 250,
		pipelining: 5,
		duration: 60,
		workers: 11,
		url: 'http://localhost:3000',
		requests: [
			{
				method: 'POST',
				path: '/api/v1/demo',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name: 'Test Name' }),
			},
		],
	},
	console.log
);

process.once('SIGINT', () => {
	instance.stop();
});

autocannon.track(instance, {
	renderProgressBar: true,
	renderResultsTable: true,
	renderLatencyTable: true,
	outputStream: process.stdout,
});
