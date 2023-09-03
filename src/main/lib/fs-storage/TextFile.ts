import fs from 'node:fs/promises';
import File from './File';
import { FileType } from './FileType';

export default class TextFile implements File<string> {
  readonly fileType: FileType.TEXT;

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

  static async load(path: string) {
    const file = new TextFile(path);
    return file.setContent(await fs.readFile(path, 'utf8'));
  }
}
