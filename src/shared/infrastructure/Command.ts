export interface Command<T = unknown> {
  execute(): T;
  undo?(): void;
}
