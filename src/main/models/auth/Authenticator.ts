import { KeyGenerator } from "../secure-storage";
import PinCode from './PinCode';

export default class Authenticator {
  private readonly pin;

  #token: string | null;

  constructor(pin: PinCode) {
    this.pin = pin;
  }

  async getToken(pin: string): Promise<string | null> {
    if (!await this.pin.checkPin(pin)) {
      return null;
    }

    if (!this.#token) {
      this.#token = await KeyGenerator.generate();
    }

    return this.#token;
  }

  validateToken(token: string): boolean {
    return this.#token === token;
  }

  reset() {
    this.#token = null;
  }
}
