import SecureStorage from '@main/services/storage/SecureStorage';
import * as Messages from '@main/Messages';
import * as CONST from '@main/CONST';

export default class PinGuard {
  static instance = new PinGuard();

  private constructor() { }

  static getInstance() {
    return PinGuard.instance;
  }

  #busy = false;

  #attempts = 0;

  async verify(pin: string | null): Promise<boolean> {
    if (this.#busy) throw new Error(Messages.ERROR_PIN_TOO_MANY_ATTEMPTS);
    this.#busy = true;
    let validFormat = true;
    if (pin !== null) {
      await this.#wait();
      this.#attempts++;
      validFormat = isValidFormat(pin)
    }
    const result = validFormat && await checkNow(pin);
    if (result) this.#attempts = 0;
    this.#busy = false;
    return result;
  }

  async setPin(pin: string | null, newPin: string) {
    if (!await this.verify(pin)) return false;
    if (!isValidFormat(newPin)) return false;
    await setNow(newPin);
    return true;
  }

  async removePin(pin: string | null) {
    if (!await this.verify(pin)) return false;
    await removeNow();
    return true;
  }

  async isSettedPin() {
    return !await this.verify(null);
  }

  #wait() {
    return new Promise<void>(resolve => {
      setTimeout(resolve, this.#attempts < CONST.PIN_UNLOCK_FAST_TRYS
        ? 0
        : CONST.PIN_UNLOCK_TRY_TIMEOUT);
    });
  }
}

function isValidFormat(pin: string): pin is string {
  return (/^\d{4}$/).test(pin);
}

async function checkNow(pin: string | null) {
  const storedPin = await SecureStorage.get('pin');
  return pin === storedPin;
}

async function setNow(value: string) {
  await SecureStorage.put('pin', value);
}

async function removeNow() {
  await SecureStorage.remove('pin');
}
