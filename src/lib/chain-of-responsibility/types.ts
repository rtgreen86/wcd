export interface Handler<T, U> {
  handle(request: T): U;
  setNext(handler: Handler<T, U>): this;
}

export type FunctionHandler<T, U> = (request: T, next: (request: T) => U) => U;
