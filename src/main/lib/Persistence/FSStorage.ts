import fs from 'node:fs/promises';
import PersistentStorage from './PersistentStorage';
import {PersistentData} from './PersistentData';

export default class FSStorage<Type> implements PersistentStorage<Type> {
  private filename: string;

  constructor(filename: string) {
    this.filename = filename;
  }

  async get() {
    const content = await fs.readFile(this.filename, 'utf8');
    return JSON.parse(content) as PersistentData<Type>;
  }

  async put(data: PersistentData<Type>) {
    const content = JSON.stringify(data);
    await fs.writeFile(this.filename, content,  'utf8');
  }
}