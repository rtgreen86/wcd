export interface File<Type> {
  get path(): string;
  read(): Promise<Type>;
  write(content: Type): Promise<void>;
}
