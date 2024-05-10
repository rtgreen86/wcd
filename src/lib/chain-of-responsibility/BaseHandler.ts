import {Handler} from './types';

export class BaseHandler<T, U extends unknown | null> implements Handler<T, U> {
  private next?: Handler<T, U>;

  handle(request: T): U {
    if (!this.next) return null;
    return this.next.handle(request);
  }

  setNext(handler: Handler<T, U>) {
    this.next = handler;
    return this;
  }
}
