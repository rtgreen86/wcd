import { Handler, FunctionHandler } from './types';
import { FunctionWrapper } from './FunctionWrapper';

type SupportedHandler<T, U> = Handler<T, U> | FunctionHandler<T, U>;

export class ChainOfResponsibility<T, U extends unknown | null> {
  private head: Handler<T, U> | null = null;

  private tail: Handler<T, U> | null = null;

  constructor(handlers?: SupportedHandler<T, U> | SupportedHandler<T, U>[]) {
    if (Array.isArray(handlers)) {
      handlers.forEach((handler) => this.addHandler(handler));
    } else if (handlers !== null) {
      this.addHandler(handlers);
    }
  }

  addHandler(handler: SupportedHandler<T, U>) {
    const wrappedHandler = typeof handler === 'function'
      ? new FunctionWrapper(handler)
      : handler;

    if (!this.tail) {
      this.head = wrappedHandler;
      this.tail = wrappedHandler;
      return;
    }

    this.tail.setNext(wrappedHandler);
    this.tail = wrappedHandler;

    return this;
  }

  handle(request: T) {
    return this.head.handle(request);
  }
}
