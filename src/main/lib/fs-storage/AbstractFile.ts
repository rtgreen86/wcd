import { FileType } from "./FileType";
import File from './File';

export default abstract class Abstractfile<Type> implements File<Type> {
  readonly fileType: FileType;

  content: Type;

  readonly path: string;

  constructor(path: string, fileType: FileType) {
    this.fileType = fileType;
    this.path = path;
  }

  setContent(content: Type) {
    this.content = content;
    return this;
  }

  abstract save(): Promise<void>;
}
