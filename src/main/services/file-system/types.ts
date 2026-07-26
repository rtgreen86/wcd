export interface ReadonlyFile<T = unknown> {
  get name(): string;
  get path(): string;

  canRead(): Promise<boolean>;
  read(): Promise<T>;
}

export interface WriteableFile<T = unknown> extends ReadonlyFile<T> {
  canWrite(): Promise<boolean>;
  write(data: T): Promise<void>;
  remove(): Promise<void>;
}
