import { writeFile, readFile } from 'node:fs/promises';
import { Storage } from '@main/types';

export default class FileSystem implements Storage {
  constructor(private file: string) {}

  async save(content: string): Promise<void> {
    await writeFile(this.file, content, 'utf8');
  }

  async load(): Promise<string> {
    return await readFile(this.file, 'utf8');
  }
}
