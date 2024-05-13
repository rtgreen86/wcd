import { Handler } from "../../lib/chain-of-responsibility";
import { Model } from "../models/ModelFactory";

type Request = electronAPI.Request;

type Response = Promise<electronAPI.Response>;

export default class PinController implements Handler<Request, Response> {
  private readonly model;

  constructor(model: Model) {
    this.model = model;
  }

  handle(request: electronAPI.Request, next: () => Response): Response {
    if (request.type === 'get:isPinExist') {
      return this.isPinExist();
    }
    if (request.type === 'set:pin') {
      return this.setPin(request.payload.pin, request.payload.newPin);
    }
    return next();
  }

  isPinExist() {
    return this.model.pin.checkIsPinSetted();
  }

  setPin(oldPin: string, newPin: string) {
    if (newPin !== '' && newPin.length !== 4) {
      throw new Error('Invalid PIN code');
    }

    return this.model.pin.setPin(oldPin, newPin);
  }
}
