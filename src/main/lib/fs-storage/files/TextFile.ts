import fs from 'node:fs/promises';
import AbstractFile from './AbstractFile';
import { FileType } from './FileType';

export default class TextFile extends AbstractFile<string> {
  readonly fileType: FileType.TEXT;

  readonly path: string;

  constructor(path: string) {
    super();
    this.path = path;
  }

  async save() {
    await fs.writeFile(this.path, this.content, 'utf8');
  }

  static async load(path: string) {
    const file = new TextFile(path);
    return file.setContent(await fs.readFile(path, 'utf8'));
  }
}
