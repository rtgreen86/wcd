import { Command } from './Command';

export interface Handler<T = unknown, K = unknown> extends Command<K> {
  execute(request?: T): K;
  setNext(handler: Handler<T, K>): this;
}

export abstract class BaseHandler<T = unknown, K extends null | unknown = unknown> implements Handler<T, K> {
  private next: Handler<T, K> | null = null;

  abstract execute(request?: T): K;

  setNext(handler: Handler<T, K>): this {
    if (this.next === null) this.next = handler;
    else this.next.setNext(handler);
    return this;
  }

  protected executeNext(request?: T): K {
    if (this.next) return this.next.execute(request);
    else return null;
  }
}

export class Pipeline<T = unknown, K extends null | unknown = unknown> extends BaseHandler<T, K> {
  constructor(handlers?: Handler<T, K>[]) {
    super();
    if (handlers) this.append(handlers);
  }

  execute(request?: T) {
    return this.executeNext(request);
  }

  append(handlers: Handler<T, K>[]) {
    for (const handler of handlers) {
      this.setNext(handler);
    }
    return this;
  }
}
