import {getEncryptedFile, putEncryptedFile} from './appDataStorage';
import * as CONST from '@main/CONST';

export default class DataStorage {
  private readonly hexKey: string;

  constructor(hexKey: string) {
    this.hexKey = hexKey;
  }

  async put(content: string) {
    await putEncryptedFile(CONST.DATA_ENCRYPTED_FILENAME, this.hexKey, content);
  }

  async get() {
    try {
      return await getEncryptedFile(CONST.DATA_ENCRYPTED_FILENAME, this.hexKey);
    } catch (error) {
      if (error.code === 'ENOENT') return '';
      throw error;
    }
  }
}
