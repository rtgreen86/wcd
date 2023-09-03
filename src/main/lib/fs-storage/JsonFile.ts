import File from "./File";
import { FileType } from "./FileType";

export default class JsonFile<Type> implements File<Type> {
  readonly fileType: FileType.JOSN;

  content: Type;

  private readonly file: File<string>;

  get path() {
    return this.file.path;
  }

  constructor(file: File<string>) {
    this.file = file;
  }

  setContent(content: Type) {
    this.content = content;
    return this;
  }

  async save() {
    this.file.content = JSON.stringify(this.content);
    await this.file.save();
  }

  private parse() {
    this.content = JSON.parse(this.file.content);
    return this;
  }

  static load<Type>(file: File<string>) {
    return new JsonFile<Type>(file).parse();
  }
}