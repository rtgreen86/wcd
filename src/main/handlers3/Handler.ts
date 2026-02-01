export abstract class Handler<T, K> {
  private nextHandler: Handler<T, K> | null = null;

  static chain<T, K>(handlers: Handler<T, K>[]) {
    if (handlers.length === 0) return null;
    if (handlers.length === 1) return handlers[0];
    return handlers.reduce((chain, handler) => chain.setNext(handler));
  }

  abstract handle(request: T): Promise<K | void>;

  setNext(handler: Handler<T, K>) {
    if (handler === this) {
      return this;
    }
    if (this.nextHandler === null) {
      this.nextHandler = handler;
      return this;
    }
    this.nextHandler.setNext(handler);
    return this;
  }

  protected next(request: T): Promise<K | void> {
    if (!this.nextHandler) return Promise.resolve();
    return this.nextHandler.handle(request);
  }
}
