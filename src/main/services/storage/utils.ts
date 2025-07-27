import { app } from 'electron';
import path from 'node:path';

export function buildAbsolutePath(filename: string) {
  return path.join(app.getPath('userData'), `wcd-${path.basename(filename)}`);
}
