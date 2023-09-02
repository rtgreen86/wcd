import { app } from 'electron';
import { join } from 'node:path';
import AbstractFile from './AbstractFile';


export default class UserFile extends AbstractFile {
  get path() {
    return '';
  }

  save() {
    return Promise.resolve();
  }

  static create(filename: string) {
    return new UserFile();
  }
}
