import PinCode from './PinCode';
import { TIMEOUT_PER_TRY } from './Settings';

class Locker {
  private threads;

  constructor(maxThreads = 1) {
    this.threads = maxThreads;
  }

  lock() {
    if (this.threads === 0) throw new Error('Busy. Try again later.');
    this.threads--;
    let count = 1;
    return () => {
      this.threads += count;
      count = 0;
    };
  }
}

class Counter {
  private count = 0;

  add() {
    if (this.count === 3) return this.count;
    return this.count++;
  }

  reset() {
    this.count = 0;
  }
}

const locker = new Locker();

const counter = new Counter();

export default class PinValidator {
  async validate(pin: string) {
    const release = locker.lock();
    await new Promise(resolve => setTimeout(resolve, counter.add() * TIMEOUT_PER_TRY));
    release();
    const isCorrect = await PinCode.check(pin)
    if (isCorrect) counter.reset();
    return isCorrect;
  }

  async change(pin: string, newPin: string) {
    if (!/^\d{4}$/.test(newPin)) throw new Error('Invalid new PIN');
    if (!await this.validate(pin)) return false;
    await PinCode.set(newPin);
    return true;
  }

  async remove(pin: string) {
    if (!await this.validate(pin)) return false;
    await PinCode.remove();
    return true;
  }

  async isPinSetted() {
    return !await PinCode.check('');
  }
}
