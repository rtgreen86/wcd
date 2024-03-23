export interface File<Type> {
  get path(): string;

  get content(): Type | undefined;

  set content(value: Type);

  load(): Promise<this>;

  save(): Promise<this>;
}
