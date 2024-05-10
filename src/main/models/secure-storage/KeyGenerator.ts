import { randomBytes } from 'node:crypto';

export const KEY_SIZE = 24;

export const KeyGenerator = {
  generate() {
    const buffer = randomBytes(KEY_SIZE);
    return buffer.toString('hex');
  }
}
