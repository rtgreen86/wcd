import { BaseHandler } from '../../lib/chain-of-responsibility';
import { Model } from "../models";

export default class AuthenticateController extends BaseHandler<electronAPI.Request, Promise<string | null>> {
  private readonly resource = 'get:token';

  private readonly model;

  constructor(model: Model) {
    super();
    this.model = model;
  }

  handle(request: electronAPI.Request) {
    if (request.resource !== this.resource) {
      return super.handle(request);
    }
    return this.model.authenticator.getToken(request.payload.pin);
  }
}
