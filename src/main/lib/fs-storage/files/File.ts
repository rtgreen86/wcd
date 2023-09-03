import { FileType } from './FileType';

export default interface File<Type> {
  readonly fileType: FileType;

  content: Type;

  readonly path: string;

  setContent(content: Type): typeof this;

  save(): Promise<void>;
}
