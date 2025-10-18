import keytar from 'keytar';
import * as CONST from '@main/CONST';

export function getSecret(key: string): Promise<string> {
  return keytar.getPassword(CONST.SECURE_STORAGE_SERVICE, key);
}

export async function putSecret(key: string, content: string) {
  await keytar.setPassword(CONST.SECURE_STORAGE_SERVICE, key, content);
}

export async function removeSecret(key: string) {
  await keytar.deletePassword(CONST.SECURE_STORAGE_SERVICE, key);
}
