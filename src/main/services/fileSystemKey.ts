import { randomBytes } from 'node:crypto';
import { getSecret, putSecret } from './SecureStorage';
import * as CONST from '@main/CONST';

export async function generateFSKey() {
  const buffer = randomBytes(CONST.FS_ENCRYPTION_KEY_SIZE);
  return buffer.toString('hex');
}

export function getKey(): Promise<string> {
  return getSecret('key');
}

export async function initializeFSKey() {
  const existsKey = await getSecret('key');
  if (!existsKey) {
    const newKey = await generateFSKey();
    await putSecret('key', newKey);
  }
}
