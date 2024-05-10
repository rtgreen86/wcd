import { app } from 'electron';
import { join, normalize } from 'node:path';
import { FileEncryptedText } from './FileEncryptedText';
import { Directory } from './Directory';

export const AppData: Directory = {
  getEncryptedFile(filename: string, hexKey: string) {
    const filepath = resolvePath(filename);
    return new FileEncryptedText(filepath, hexKey);
  }
}

function resolvePath(filename: string) {
  const userData = app.getPath('userData');
  const filepath = normalize(join(userData, filename));
  if (!filepath.startsWith(userData)) {
    throw new Error('Invalid filename');
  }
  return filepath;
}
