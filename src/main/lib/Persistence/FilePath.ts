import { app } from 'electron';
import path from 'node:path';

export function getFilePath(filename: string) {
  return path.join(
    app.getPath('userData'),
    path.parse(filename).base
  );
}
