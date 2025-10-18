import {getSecret, putSecret, removeSecret} from '@main/services/secureStorage';
import * as Messages from '@main/Messages';
import * as CONST from '@main/CONST';

let busy = false;
let attempts = 0;

export default class PinGuard {
  private static instance?: PinGuard;

  private constructor() { }

  static getInstance(): PinGuard {
    if (!PinGuard.instance) PinGuard.instance = new PinGuard();
    return PinGuard.instance;
  }

  async verify(pin: string | null): Promise<boolean> {
    if (busy) throw new Error(Messages.ERROR_PIN_TOO_MANY_ATTEMPTS);
    busy = true;
    let validFormat = true;
    if (pin !== null) {
      await wait();
      attempts++;
      validFormat = isValidFormat(pin)
    }
    const result = validFormat && await checkNow(pin);
    if (result) attempts = 0;
    busy = false;
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

}

function wait() {
  return new Promise<void>(resolve => {
    setTimeout(resolve, attempts < CONST.PIN_UNLOCK_FAST_TRYS
      ? 0
      : CONST.PIN_UNLOCK_TRY_TIMEOUT);
  });
}

function isValidFormat(pin: string): pin is string {
  return (/^\d{4}$/).test(pin);
}

async function checkNow(pin: string | null) {
  const storedPin = await getSecret('pin');
  return pin === storedPin;
}

async function setNow(value: string) {
  await putSecret('pin', value);
}

async function removeNow() {
  await removeSecret('pin');
}
