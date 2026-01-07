import { app } from 'electron';
import path from 'node:path';

import * as fs from './fileSystemStorage';

export function buildAbsolutePath(filename: string) {
  return path.join(app.getPath('userData'), `wcd-${path.basename(filename)}`);
}

export function getTextFile(filename: string): Promise<string> {
  return fs.getTextFile(buildAbsolutePath(filename));
}

export function putTextFile(filename: string, content: string) {
  return fs.putTextFile(buildAbsolutePath(filename), content);
}

export function getEncryptedFile(filename: string, hexKey: string): Promise<string> {
  return fs.getEncryptedFile(buildAbsolutePath(filename), hexKey);
}

export function putEncryptedFile(filename: string, hexKey: string, content: string) {
  return fs.putEncryptedFile(buildAbsolutePath(filename), hexKey, content);
}
