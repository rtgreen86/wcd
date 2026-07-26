import { safeStorage } from 'electron';
import { randomBytes, getCiphers } from 'node:crypto';
import * as CONST from './const';

export class Encryption {
  static createKey() {
    const buffer = randomBytes(CONST.CRYPTO_KEY_SIZE);
    return buffer.toString('hex');
  }

  static isEncryptionSupported() {
    if (!safeStorage.isEncryptionAvailable()) {
      return false;
    }

    if (process.platform === 'linux') {
      const backend = safeStorage.getSelectedStorageBackend();
      if (backend === 'basic_text') {
        return false;
      }
    }

    if (!getCiphers().includes(CONST.CRYPTO_ALGORITHM)) {
      return false;
    }

    return true;
  }
}
