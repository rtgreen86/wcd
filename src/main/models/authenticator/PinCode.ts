import { Secret } from '../secure-storage';

export default class PinCode {
  static async check(pin: string) {
    const _pin = await Secret.get('pin') || '';
    return _pin === pin;
  }

  static async set(pin: string) {
    await Secret.put('pin', pin);
  }

  static async remove() {
    await Secret.remove('pin');
  }
}
