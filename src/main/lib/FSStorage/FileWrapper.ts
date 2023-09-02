import File from './File';

export default abstract class FileWrapper<Type> implements File<Type> {
  content: Type;

  readonly path: string;

  protected readonly file: File<Type>;

  constructor(file: File<Type>) {
    this.file = file;
  }

  abstract save(): Promise<typeof this>;
}
