import File from "./File";
import TextFile from "./TextFile";

export default class JsonFile<Type> implements File<Type> {
  content: Type;

  private readonly file: TextFile;

  get path() {
    return this.file.path;
  }

  constructor(pathOrFile: string | TextFile) {
    this.file = typeof pathOrFile === 'string'
      ? pathOrFile = new TextFile(pathOrFile)
      : pathOrFile;
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

  static async load(path: string) {
    return new JsonFile(await TextFile.load(path)).parse();
  }
}