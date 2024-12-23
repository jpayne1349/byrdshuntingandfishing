/**
 * Generates a randomID with an optional prefix
 * @param prefix string to prefix onto ID e.g. event_{randomID}
 * @returns formatted randomID
 */
export function generateUUID(prefix?: string, length?: number) {
	const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let randomID = prefix || '';

	let loopcount = length ?? 20;

	for (let i = 0; i < loopcount; i++) {
		randomID += chars.charAt(Math.floor(Math.random() * chars.length));
	}

	return randomID;
}
