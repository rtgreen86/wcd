import { getPassword, setPassword, deletePassword } from '../secure-storage';

const timeoutPerTry = 5000;

export default class PinCode {
  private try = 0;

  private blocker = Promise.resolve();

  private readonly account = 'PIN CODE';

  private service;

  constructor(service: string) {
    this.service = service;
  }

  async authenticate(pin: string) {
    await this.blocker;
    const _pin = await getPassword(this.service, this.account);
    if (!_pin || _pin === pin) {
      this.resetTrys();
      return true;
    }
    this.incrementTrys();
    return false;
  }

  async checkIsPinSetted() {
    const pin = await getPassword(this.service, this.account);
    return pin !== null;
  }

  async setPin(oldPin: string, newPin: string) {
    if (!await this.authenticate(oldPin)) {
      return false;
    }
    await setPassword(this.service, this.account, newPin);
    return true;
  }

  async removePin(oldPin: string) {
    if (!await this.authenticate(oldPin)) {
      return false;
    }
    await deletePassword(this.service, this.account);
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
    this.blocker = new Promise((resolve) => setTimeout(resolve, this.try * timeoutPerTry));
  }
}
