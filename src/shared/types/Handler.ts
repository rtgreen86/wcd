export interface Handler<T, K> {
  handle(request: T): Promise<K>;
  append(handler: Handler<T, K>): this;
}
