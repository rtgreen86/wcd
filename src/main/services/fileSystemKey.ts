import { randomBytes } from 'node:crypto';
import { getSecret, putSecret, Key } from './SecureStorage';
import * as CONST from '../Const';

export async function generateFSKey() {
  const buffer = randomBytes(CONST.FS_ENCRYPTION_KEY_SIZE);
  return buffer.toString('hex');
}

export function getKey(): Promise<string> {
  return getSecret(Key.CryptoKey);
}

export async function initializeFSKey() {
  const existsKey = await getSecret(Key.CryptoKey);
  if (!existsKey) {
    const newKey = await generateFSKey();
    await putSecret(Key.CryptoKey, newKey);
  }
}
