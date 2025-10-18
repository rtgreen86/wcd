import keytar from 'keytar';
import * as CONST from '@main/CONST';

export default class SecureStorage {
  static get(key: string) {
    return keytar.getPassword(CONST.SECURE_STORAGE_SERVICE, key);
  }

  static async put(key: string, content: string) {
    await keytar.setPassword(CONST.SECURE_STORAGE_SERVICE, key, content);
  }

  static async remove(key: string) {
    await keytar.deletePassword(CONST.SECURE_STORAGE_SERVICE, key);
  }
}
