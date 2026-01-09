import { Handler } from './Handler';

export interface Command<T = unknown, K = unknown> extends Handler<T, K> {
  readonly canUndo: boolean;
  execute(request?: T): K;
  undo(): void;
}

export abstract class BaseCommand<T = unknown, K = unknown> implements Command<T, K> {
  readonly canUndo: false;
  abstract execute(request?: T): K;
  undo() {}
}
