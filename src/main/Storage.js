import { app } from 'electron';
import path from 'node:path';
import fs from 'node:fs/promises';

const filename = 'data.json';

export default class Storage {
  static put(payload) {
    const folder = app.getPath('userData');
    const filePath = path.join(folder, filename);
    return fs.writeFile(filePath, payload, 'utf8');
  }

  static async get() {
    const folder = app.getPath('userData');
    const filePath = path.join(folder, filename);
    try {
      return await fs.readFile(filePath, 'utf8');
    } catch (err) {
      if (err.code === 'ENOENT') return '{}';
      throw err;
    }
  }
}
