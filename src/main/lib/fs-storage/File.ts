export default interface File<Type> {
  content: Type;

  readonly path: string;

  setContent(content: Type): typeof this;

  save(): Promise<void>;
}
