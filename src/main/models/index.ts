import { Authenticator, PinValidator } from './authenticator';
import {Secret, KeyGenerator} from './secure-storage'

export * from './secure-storage';

export * from './storage';

export class Model {
  readonly validator = new PinValidator();
  readonly authenticator = new Authenticator(this.validator);
}

export async function initializeKey() {
  const existsKey = await Secret.get('key');
  if (!existsKey) {
    const newKey = KeyGenerator.generate();
    Secret.put('key', newKey);
  }
}
