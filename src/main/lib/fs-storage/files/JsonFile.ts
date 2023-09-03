import AbstractFile from "./AbstractFile";
import File from "./File";
import { FileType } from "./FileType";

export default class JsonFile<Type> extends AbstractFile<Type> {
  readonly fileType = FileType.JOSN;

  private readonly textFile: File<string>;

  get path() {
    return this.textFile.path;
  }

  constructor(textFile: File<string>) {
    super();
    this.textFile = textFile;
  }

  async save() {
    this.textFile.content = JSON.stringify(this.content);
    await this.textFile.save();
  }

  private parse() {
    this.content = JSON.parse(this.textFile.content);
    return this;
  }

  static load<Type>(file: File<string>) {
    return new JsonFile<Type>(file).parse();
  }
}