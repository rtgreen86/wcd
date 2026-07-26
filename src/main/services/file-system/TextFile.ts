import { readFile, writeFile } from 'node:fs/promises';
import { File } from './File';

export class TextFile extends File<string> {
  read(): Promise<string> {
    return readFile(this.path, 'utf8');
  }

  write(data: string) {
    return writeFile(this.path, data, 'utf8');
  }
}
