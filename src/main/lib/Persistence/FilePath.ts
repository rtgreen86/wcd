import { app } from 'electron';
import path from 'node:path';

export function getFilePath(filename: string) {
  return path.join(
    getUserData(),
    getBase(filename)
  );
}

function getUserData() {
  return app.getPath('userData');
}

function getBase(filePath: string) {
  return path.parse(filePath).base;
}
