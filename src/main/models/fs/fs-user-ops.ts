import { getUserFilePath } from './path-ops';
import { encryptedLoad, encryptedSave } from './fs-encrypted-ops';

export function saveUserFile(filename: string, hexKey: string, content: string) {
  return encryptedSave(
    getUserFilePath(filename),
    hexKey,
    content
  );
}

export function loadUserFile(filename: string, hexKey: string) {
  return encryptedLoad(
    getUserFilePath(filename),
    hexKey
  );
}
