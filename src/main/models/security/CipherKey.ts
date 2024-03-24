import { getPassword, setPassword } from '../../../lib/secure-storage';
import { randomBytes } from 'node:crypto';
import { name as applicationName } from '../../../../package.json';

const account = 'security key';

export class CipherKey {
  static async setKey(key: string) {
    setPassword(applicationName, account, key);
  }

  static getKey() {
    return getPassword(applicationName, account);
  }

  static generateKey(size: number) {
    const buffer = randomBytes(size);
    return buffer.toString('base64');
  }
}
