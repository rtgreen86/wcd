export abstract class Handler<T, K> {
  private nextHandler: Handler<T, K> | null = null;

  static chain<T, K>(handlers: Handler<T, K>[]) {
    if (handlers.length === 0) throw new Error('At least one handler is expected.');
    if (handlers.length === 1) return handlers[0];
    return handlers.reduce((chain, handler) => chain.setNext(handler));
  }

  abstract handle(request: T): Promise<K>;

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

  protected next(request: T): Promise<K> {
    if (!this.nextHandler) throw new Error('The request is not supported.', { cause: request });
    return this.nextHandler.handle(request);
  }
}
