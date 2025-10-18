import SecureStorage from '../SecureStorage';
import AppData from './AppData';
import EncryptedFileSystem from './EncryptedFileSystem';


import * as CONST from '@main/CONST';

export default class DataStorage {
  static async put(content: string) {
    const hexKey = await SecureStorage.get('key');
    await AppData.putEncrypted(CONST.DATA_ENCRYPTED_FILENAME, hexKey, content);
  }

  static async get() {
    const hexKey = await SecureStorage.get('key');
    try {
      return await AppData.getEncrypted(CONST.DATA_ENCRYPTED_FILENAME, hexKey);
    } catch (error) {
      if (error.code === 'ENOENT') return '';
      throw error;
    }
  }

  static async initializeFSKey() {
    const existsKey = await SecureStorage.get('key');
    if (!existsKey) {
      const newKey = await EncryptedFileSystem.generateFSKey();
      await SecureStorage.put('key', newKey);
    }
  }
}
