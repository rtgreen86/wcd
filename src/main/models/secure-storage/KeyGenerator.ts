import { randomBytes } from 'node:crypto';
import { KEY_SIZE } from './const';

export default class KeyGenerator {
  static generate() {
    const buffer = randomBytes(KEY_SIZE);
    return buffer.toString('hex');
  }
}
