import { Secret } from '../secure-storage';

type Pin = string | null;

const TIMEOUT_PER_TRY = 5000;

export default class PinCode {
  private try = 0;

  private blocker = Promise.resolve();

  async checkPin(pin: Pin) {
    await this.blocker;
    const savedPin = await Secret.get('pin');
    if (!savedPin || savedPin === pin) {
      this.resetTrys();
      return true;
    }
    this.incrementTrys();
    return false;
  }

  async checkIsPinSetted() {
    const pin = await Secret.get('pin');
    return pin !== null;
  }

  async setPin(oldPin: Pin, newPin: Pin) {
    if (!await this.checkPin(oldPin)) {
      return false;
    }
    if (newPin === null) {
      await Secret.remove('pin');
      return true;
    }
    await Secret.put('pin', newPin);
    return true;
  }

  private incrementTrys() {
    this.try++;
    this.setTimeout();
  }

  private resetTrys() {
    this.try = 0;
    this.setTimeout();
  }

  private setTimeout() {
    this.blocker = new Promise((resolve) => setTimeout(resolve, this.try * TIMEOUT_PER_TRY));
  }
}
