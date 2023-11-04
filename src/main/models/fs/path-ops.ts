import { app } from 'electron';
import { join, parse } from 'node:path';

export function getUserFilePath(filename: string): string {
  return join(
    app.getPath('userData'),
    `wc-${parse(filename).base}`
  );
}
