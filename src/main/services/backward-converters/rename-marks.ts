// Before version 0.1.3-alpha, data was stored in the file marks. This file needs to be renamed to wcd-marks.json.enc.

import { app } from 'electron';
import { join } from 'node:path';
import FileSystem from '../FileSystem';
import { existsSync } from "fs";
import { rename } from "fs/promises";

const oldfn = 'marks';
const newfn = 'marks.json.enc';

export async function renameMarks() {
  const oldp = join(app.getPath('userData'), oldfn);

  if (!existsSync(oldp)) {
    return;
  }

  const newp = FileSystem.buildAppDataPath(newfn);

  if (existsSync(newp)) {
    throw new Error('New File aready exists. Data from old version is not converted.');
  }

  await rename(oldp, newp);
}
