import { Authenticator, PinValidator } from './authenticator';

export default class Model {
  data: string;
  key: string;
  sessionTokens = new Set<string>();

  // Legacy
  readonly validator = new PinValidator();
  readonly authenticator = new Authenticator(this.validator);
}
