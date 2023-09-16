import { randomBytes } from 'node:crypto';

export default class KeyGenerator {
  static async generateHex(byteSize = 24) {
    return (await randomBytes(byteSize)).toString('hex');
  }
}
