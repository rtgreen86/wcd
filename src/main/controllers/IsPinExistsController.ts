import { BaseHandler } from '../../lib/chain-of-responsibility';
import { Model } from "../models";

export default class IsPinExistsController extends BaseHandler<electronAPI.Request, Promise<electronAPI.Response>> {
  private readonly resource = 'get:isPinExists';

  private readonly model;

  constructor(model: Model) {
    super();
    this.model = model;
  }

  async handle(request: electronAPI.Request) {
    if (request.resource === this.resource) {
      return this.model.pin.checkIsPinSetted();
    }
    return super.handle(request);
  }
}
