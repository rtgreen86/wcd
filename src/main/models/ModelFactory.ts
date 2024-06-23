import { Model } from './Model';
import PinCode from './auth/PinCode';
import Authenticator from './auth/Authenticator';

export default class ModelFactory {
  static createModel(): Model {
    const pin = new PinCode();
    const authenticator = new Authenticator(pin);
    return { pin, authenticator };
  }
}
