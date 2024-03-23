import { Handler } from './Handler';

export default class ChainOfResponsibility<Request, Response> {
  private handlers: Handler<Request, Response>[];

  constructor(handlers = [] as Handler<Request, Response>[]) {
    this.handlers = handlers;
  }

  addHandler(handler: Handler<Request, Response>) {
    this.handlers.push(handler);
    return this;
  }

  handle(request: Request) {
    const handlers = this.handlers;
    const invoker:  (index?: number) => Response | null = (index = 0) => {
      if (!handlers[index]) return null;
      return handlers[index].handle(request, () => invoker(index + 1));
    };
    return invoker();
  }
}
