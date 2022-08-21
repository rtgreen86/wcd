import { app } from 'electron';
import path from 'node:path';
import fs from 'node:fs/promises';

export default class Storage {
  static put(payload) {
    const folder = app.getPath('userData');
    const filePath = path.join(folder, 'data.json');
    return fs.writeFile(filePath, payload, 'utf8');
  }
}
