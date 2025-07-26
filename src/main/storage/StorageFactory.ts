import { app } from 'electron';
import path from 'node:path';
import { Storage } from '@main/types';
import FileSystem from "./FileSystem";
import EncryptedFileSystem from "./EncryptedFileSystem";

export default class StorageFactory {
  getAppDataStorage(file: string): Storage {
    return new FileSystem(path.join(app.getPath('userData'), `${path.basename(file)}.json`));
  }

  getEncryptedAppDataStorage(file: string, hexKey: string): Storage {
    return new EncryptedFileSystem(path.join(app.getPath('userData'), `${path.basename(file)}.json`), hexKey);
  }
}
