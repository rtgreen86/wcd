import { readFile, writeFile } from 'node:fs/promises';

export default class FileSystem {
  static get(filename: string) {
    return readFile(filename, 'utf8');
  }

  static async put(filename: string, content: string) {
    await writeFile(filename, content, 'utf8');
  }
}
