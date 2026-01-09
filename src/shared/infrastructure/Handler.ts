export interface Handler<T = unknown, K = unknown> {
  execute(request?: T): K;
}
