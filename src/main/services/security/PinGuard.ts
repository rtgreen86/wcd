import GetSecretValue from '@main/commands/secureStorage/GetSecretValue';
import PutSecretValue from '@main/commands/secureStorage/PutSecretValue';
import RemoveSecretKey from '@main/commands/secureStorage/RemoveSecretKey';
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

  async setPIN(pin: string | null, newPin: string) {
    if (!await this.verify(pin)) return false;
    if (!isValidFormat(newPin)) return false;
    await setNow(newPin);
    return true;
  }

  async removePIN(pin: string | null) {
    if (!await this.verify(pin)) return false;
    await removeNow();
    return true;
  }

  async isSettedPIN() {
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
  const storedPin = await new GetSecretValue({ key: 'pin' }).execute();
  return pin === storedPin;
}

async function setNow(value: string) {
  await new PutSecretValue({ key: 'pin', value }).execute();
}

async function removeNow() {
  await new RemoveSecretKey({ key: 'pin' }).execute();
}
