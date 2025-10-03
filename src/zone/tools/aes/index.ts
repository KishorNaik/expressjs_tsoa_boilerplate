/*
Command:
npx ts-node-dev --inspect=4321 --pretty --transpile-only -r tsconfig-paths/register src/zone/tools/aes/index.ts
*/

import { ENCRYPTION_KEY } from '@/config/env';
import { BufferWrapper, AES } from '@kishornaik/utils';

// Request Body
export const requestBody = {
	title: 'Shopping groceries',
	description: 'Eggs, milk, bread, and cheese',
};

const main = async () => {
	const encryptionKey = BufferWrapper.toString(BufferWrapper.generateSecureBuffer(32), 'base64'); // 32 Byte Aes Key
	console.log(`encryptionKey:${encryptionKey}`);

	const aes = new AES(ENCRYPTION_KEY ?? encryptionKey);

	const encryptRequestBody = await aes.encryptAsync(JSON.stringify(requestBody));
	console.log('encryptRequestBody: ', encryptRequestBody);

	const decryptRequestBody = await aes.decryptAsync(encryptRequestBody);
	console.log('decryptRequestBody: ', JSON.parse(decryptRequestBody));
};

main()
	.then()
	.catch((e) => console.error(e));
