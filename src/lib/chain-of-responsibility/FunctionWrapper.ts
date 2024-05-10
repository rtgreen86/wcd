import { FunctionHandler } from './types';
import { BaseHandler } from './BaseHandler';

export class FunctionWrapper<T, U> extends BaseHandler<T, U> {
  private fn: FunctionHandler<T, U>;

  constructor(fn: FunctionHandler<T, U>) {
    super();
    this.fn = fn;
  }

  handle(request: T) {
    return this.fn(request, (request: T) => super.handle(request));
  }
}
