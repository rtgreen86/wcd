import { Authenticator, PinValidator } from './authenticator';
import {Secret, KeyGenerator} from './secure-storage'

export * from './secure-storage';

export * from './storage';

export { default as Model } from './Model';

export async function initializeKey() {
  const existsKey = await Secret.get('key');
  if (!existsKey) {
    const newKey = KeyGenerator.generate();
    Secret.put('key', newKey);
  }
}
