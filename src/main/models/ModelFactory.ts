import PinCode from './PinCode';
import Authenticator from './Authenticator';

export interface Model {
  pin: PinCode;
  authenticator: Authenticator;
}

export default class ModelFactory {
  static createModel(): Model {
    const pin = new PinCode();
    const authenticator = new Authenticator(pin);
    return { pin, authenticator };
  }
}
