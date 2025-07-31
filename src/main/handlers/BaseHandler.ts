import { Handler } from '@shared/types';
import Model from '@main/models/Model';

type BaseRequest = { type: string };

export default class BaseHandler<T extends BaseRequest, K = T> implements Handler<T, K> {
  private nextHandler: BaseHandler<T, K>;

  constructor(public readonly model: Model) { }

  handle(request: T): Promise<K> {
    if (this.nextHandler) return this.nextHandler.handle(request);
    throw new Error(`Unhandled request type: ${request.type}`);
  }

  append(handler: BaseHandler<T, K>) {
    if (this.nextHandler) this.nextHandler.append(handler);
    else this.nextHandler = handler;
    return this;
  }
}
