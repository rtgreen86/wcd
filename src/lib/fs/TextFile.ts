import { readFile, writeFile } from 'node:fs/promises';
import { File } from './File';

export class TextFile implements File<string> {
  readonly path;

  content: string;

  constructor(path: string) {
    this.path = path;
    this.content = '';
  }

  async load() {
    this.content = await readFile(this.path, 'utf-8');
    return this;
  }

  async save() {
    await writeFile(this.path, this.content, 'utf-8');
    return this;
  }
}
