import PinCode from './auth/PinCode';
import Authenticator from './auth/Authenticator';

export interface Model {
  pin: PinCode;
  authenticator: Authenticator;
}
