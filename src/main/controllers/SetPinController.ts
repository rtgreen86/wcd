import { BaseHandler } from "../../lib/chain-of-responsibility";
import { Model } from "../models";

export class SetPinController extends BaseHandler<electronAPI.Request, Promise<boolean>> {
  private readonly resource = 'set:pin';

  private readonly model;

  constructor(model: Model) {
    super();
    this.model = model;
  }

  handle(request: electronAPI.Request) {
    if (request.resource === this.resource) {
      return this.model.pin.setPin(request.payload.pin, request.payload.newPin);
    }
    return super.handle(request);
  }
}
