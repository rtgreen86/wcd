import { KeyGenerator } from "./secure-storage";
import PinCode from './PinCode';

const tokens: string[] = [];

export default class Authenticator {
  private readonly pin;

  constructor(pin: PinCode) {
    this.pin = pin;
  }

  async getToken(pin: string): Promise<string | null> {
    if (!await this.pin.checkPin(pin)) {
      return null;
    }

    const token = await KeyGenerator.generate();
    tokens.push(token);
    return token;
  }

  validateToken(token: string): boolean {
    return tokens.includes(token);
  }

  reset() {
    tokens.length = 0;
  }
}

