import { app } from 'electron';
import { join, parse } from 'node:path';
import { loadEncryptedFile, saveEncryptedFile } from './fs-encrypted';

export function getAbsolutePath(filename: string): string {
  return join(
    app.getPath('userData'),
    `wc-${parse(filename).base}`
  );
}

export function put(filename: string, hexKey: string, content: string) {
  const filepath = getAbsolutePath(filename);
  return saveEncryptedFile(filepath, hexKey, content);
}

export async function get(filename: string, hexKey: string) {
  const filepath = getAbsolutePath(filename);
  try {
    return await loadEncryptedFile(filepath, hexKey);
  } catch (err) {
    if (err.code === 'ENOENT') {
      return '';
    }
    throw err;
  }
}
