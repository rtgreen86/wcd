import { FileType } from './FileType';
import File from './File';

export default abstract class Abstractfile<Type> implements File<Type> {
  readonly fileType: FileType;

  content: Type;

  abstract get path(): string;

  setContent(content: Type) {
    this.content = content;
    return this;
  }

  abstract save(): Promise<void>;
}
