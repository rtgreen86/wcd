export interface KeyStorage {
  get(): Readonly<Buffer>;
}
