import path from 'node:path';
import { app } from 'electron';

export function buildAppDataPath(filename: string) {
  return path.join(app.getPath('userData'), `wcd-${path.basename(filename)}`);
}

export function buildExportPath(filename: string) {
  return path.join(app.getPath('documents'), path.basename(filename));
}
