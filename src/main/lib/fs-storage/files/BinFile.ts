import fs from 'node:fs/promises';
import { Buffer } from 'node:buffer';
import AbstractFile from './AbstractFile';
import { FileType } from './FileType';

export default class BinFile extends AbstractFile<Buffer> {
  readonly fileType = FileType.BIN;

  readonly path: string;

  constructor(path: string) {
    super();
    this.path = path;
  }

  async save() {
    await fs.writeFile(this.path, this.content);
  }

  static async load(path: string) {
    const file = new BinFile(path);
    file.content = await fs.readFile(path);
    return file;
  }
}
