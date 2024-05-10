import { KeyGenerator } from "../secure-storage";
import PinValidator from './PinValidator';

export default class Authenticator {
  #validator;

  #token: string;

  constructor(validator: PinValidator) {
    this.#validator = validator;
    this.reset();
  }

  async getToken(pin: string): Promise<string | null> {
    if (await this.#validator.validate(pin)) return this.#token;
    return null;
  }

  validateToken(token: string): boolean {
    return this.#token === token;
  }

  async reset() {
    this.#token = await KeyGenerator.generate();
  }
}
