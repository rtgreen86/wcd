import { Handler } from './Handler';
import { BaseCommand } from './Command';

export interface PipelineHandler<T = unknown, K extends null | unknown = unknown> extends Handler<T, K> {
  setNext(handler: PipelineHandler<T, K>): this;
}

export class BasePipelineHandler<T = unknown, K extends null | unknown = unknown> extends BaseCommand<T, K>  implements PipelineHandler<T, K> {
  private next: PipelineHandler<T, K> | null = null;

  execute(request?: T): K {
    return this.next
      ? this.next.execute(request)
      : null;
  }

  setNext(handler: PipelineHandler<T, K>): this {
    if (this.next === null) this.next = handler;
    else this.next.setNext(handler);
    return this;
  }
}

export class Pipeline<T = unknown, K extends null | unknown = unknown> extends BasePipelineHandler<T, K> {
  constructor(handlers?: PipelineHandler<T, K>[]) {
    super();
    if (handlers) this.append(handlers);
  }

  append(handlers: PipelineHandler<T, K>[]) {
    for (const handler of handlers) {
      this.setNext(handler);
    }
    return this;
  }
}
