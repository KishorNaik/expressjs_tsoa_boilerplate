import { setDatabase } from '../db';

export const workerPlugins = async () => {
	await setDatabase();
};
