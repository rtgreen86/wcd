import keytar from 'keytar';
import { Secret, Key } from './Secret'

const service = 'su.malokhatko.wcalendar';

export const SecretKeytar: Secret = {
  get(key: Key) {
    return keytar.getPassword(service, key)
  },

  put(key: Key, secret: string) {
    return keytar.setPassword(service, key, secret);
  },

  remove(key: Key) {
    return keytar.deletePassword(service, key);
  }
}
