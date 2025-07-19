export interface Command<T = unknown, K = T> {
  execute(): T;
  undo?(): K;
}
