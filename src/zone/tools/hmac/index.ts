/*
Command:
npx ts-node-dev --inspect=4321 --pretty --transpile-only -r tsconfig-paths/register src/zone/tools/hmac/index.ts
*/

import { BufferWrapper, HmacWrapper } from '@kishornaik/utils';

const payload = JSON.stringify({ userId: 123, role: 'admin' });
const secret = BufferWrapper.toString(BufferWrapper.generateSecureBuffer(64), 'base64'); // 64-byte HMAC key

console.log('🔐 Secret Key:', secret);

// ✅ Generate HMAC
const hmacResult = HmacWrapper.generate(payload, secret);
if (hmacResult.isOk()) {
	const signature = hmacResult.value;
	console.log('✅ Generated Signature:', signature);

	// ✅ Compare HMAC
	const compareResult = HmacWrapper.compare(payload, secret, signature);
	if (compareResult.isOk()) {
		console.log('✅ Signature is valid');
	} else {
		console.error('❌ Signature comparison failed:', compareResult.error.message);
	}
} else {
	console.error('❌ HMAC generation failed:', hmacResult.error.message);
}
