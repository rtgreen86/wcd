import SecretFacade from '@main/facades/SecretFacade';

export default class PinCode {
  static async check(pin: string) {
    const _pin = await SecretFacade.get('pin') || '';
    return _pin === pin;
  }

  static async set(pin: string) {
    await SecretFacade.put('pin', pin);
  }

  static async remove() {
    await SecretFacade.remove('pin');
  }
}
