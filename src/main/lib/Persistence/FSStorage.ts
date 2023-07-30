import fs from 'node:fs/promises';
import PersistentStorage from './PersistentStorage';
import { PersistentData } from './PersistentData';
import { getFilePath } from './FilePath';

export default class FSStorage<Type> implements PersistentStorage<Type> {
  private filename: string;

  constructor(filename: string) {
    this.filename = getFilePath(filename);
  }

  async get() {
    const content = await fs.readFile(this.filename, 'utf8');
    return JSON.parse(content) as PersistentData<Type>;
  }

  async put(items: Type[]) {
    const content = JSON.stringify({
      version: 1,
      items
    } as PersistentData<Type>);
    await fs.writeFile(this.filename, content,  'utf8');
  }
}