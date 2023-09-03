import File from './File';

export default abstract class FileWrapper<Type> implements File<Type> {
  protected readonly file: File<Type>;

  constructor(file: File<Type>) {
    this.file = file;
  }

  get path() {
    return this.file.path;
  }

  get content() {
    return this.file.content;
  }

  set content(value) {
    this.file.content = value;
  }

  setContent(content: Type) {
    this.content = content;
    return this;
  }

  save() {
    return this.file.save();
  }
}
