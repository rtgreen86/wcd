export interface Handler<T> {
  setNext(handler: Handler<T>): this;
  handle(request: T): T | undefined;
}
