export interface Storage<T> {
  save(content: T): Promise<void>;
  load(): Promise<T>
}
