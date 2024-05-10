export interface Command<R> {
  execute(): R;
}

export abstract class CommandBase<R, P = void> implements Command<R> {
  readonly params;

  constructor(params: P) {
    this.params = params;
  }

  abstract execute(): R;
}
