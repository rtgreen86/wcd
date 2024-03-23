import { TextFile, CipheredTextFile } from '../fs';
import { join, normalize } from 'node:path';
import { app } from 'electron';


export class AppData {
  static getFile(filename: string) {
    return new TextFile(resolvePath(filename));
  }

  static getCipheredFile(filename: string, hexKey: string) {
    return new CipheredTextFile(resolvePath(filename), hexKey);
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
