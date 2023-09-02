import File from './File';
import fs from 'node:fs/promises';

export default class TextFile implements File<string> {
  content = '';

  readonly path: string;

  constructor(path: string) {
    this.path = path;
  }

  setContent(content: string) {
    this.content = content;
    return this;
  }

  async save() {
    await fs.writeFile(this.path, this.content, 'utf8');
  }

  private async load() {
    this.content = await fs.readFile(this.path, 'utf8');
    return this;
  }

  static create(path: string) {
    return new TextFile(path);
  }

  static async load(path: string) {
    return await TextFile.create(path).load();
  }
}
