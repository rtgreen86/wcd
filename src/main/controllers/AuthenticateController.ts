import { BaseHandler } from '../../lib/chain-of-responsibility';
import { Model } from "../models";

export default class AuthenticateController extends BaseHandler<WCD.Request, Promise<WCD.Response>> {
  private readonly model;

  constructor(model: Model) {
    super();
    this.model = model;
  }

  handle(request: WCD.Request): Promise<WCD.Response> {
    if (request.type === 'get:isPinExists') {
      return this.model.validator.isPinSetted();
    }

    if (request.type === 'set:pin') {
      return this.model.validator.change(
        request.payload.pin,
        request.payload.newPin
      );
    }

    if (request.type === 'remove:pin') {
      return this.model.validator.remove(
        request.payload.pin
      );
    }

    if (request.type === 'get:token') {
      return this.model.authenticator.getToken(
        request.payload.pin
      );
    }

    return super.handle(request);
  }
}
