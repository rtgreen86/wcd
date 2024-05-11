import { Model } from '../models/ModelFactory';
import { Handler } from '../../lib/chain-of-responsibility';

type Request = electronAPI.Request;

type Response = Promise<electronAPI.Response>;

export default class IsPinExists implements Handler<Request, Response> {
  private readonly model;

  constructor(model: Model) {
    this.model = model;
  }

  handle(request: Request, next: () => Response): Response {
    if (request.type !== 'get:isPinExist') {
      return next();
    }
    return this.model.pin.checkIsPinSetted();
  }
}
