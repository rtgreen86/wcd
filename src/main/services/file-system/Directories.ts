import { app } from 'electron';
import { join } from 'node:path';

export class Directories {
  static userDataFile(name: string) {
    return join(app.getPath('userData'), name)
  }
}
