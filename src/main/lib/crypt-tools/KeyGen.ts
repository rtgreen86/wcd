import { randomBytes } from 'node:crypto';

export default class KeyGen {
  size = 24;

  generate() {
    return randomBytes(this.size);
  }
}
