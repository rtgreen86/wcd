import FileSystem from './FileSystem';
import * as CONST from '@main/CONST';

export default class DataStorage {
  private readonly hexKey: string;

  constructor(hexKey: string) {
    this.hexKey = hexKey;
  }

  async put(content: string) {
    await FileSystem.putAppDataEncryptedFile(CONST.DATA_ENCRYPTED_FILENAME, this.hexKey, content);
  }

  async get() {
    try {
      return await FileSystem.getAppDataEncryptedFile(CONST.DATA_ENCRYPTED_FILENAME, this.hexKey);
    } catch (error) {
      if (error.code === 'ENOENT') return '';
      throw error;
    }
  }
}
