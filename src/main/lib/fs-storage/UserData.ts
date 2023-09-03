import { app } from 'electron';
import { join, parse } from 'node:path';

import { FileType } from './FileType';
import Directory from './Directory';

import File from './File'
import TextFile from './TextFile';
import JsonFile from './JsonFile';

export default class UserData implements Directory {
  readonly path = app.getPath('userData');

  getAbsolutePath(filename: string) {
    return join(this.path, 'wc-' + parse(filename).base);
  }

  create(filename: string, type: FileType.TEXT): File<string>;
  create<Type>(filename: string, type: FileType.JOSN): File<Type>
  create<Type>(filename: string, type: FileType) {
    switch (type) {
      case FileType.JOSN:
        return new JsonFile<Type>(this.create(this.getAbsolutePath(filename), FileType.TEXT));
      default:
        return new TextFile(this.getAbsolutePath(filename));
    }
  }

  async load(filename: string, type: FileType.TEXT): Promise<File<string>>;
  async load<Type>(filename: string, type: FileType.JOSN): Promise<File<Type>>
  async load<Type>(filename: string, type: FileType) {
    switch (type) {
      case FileType.JOSN:
        return JsonFile.load<Type>(await this.load(this.getAbsolutePath(filename), FileType.TEXT));
      default:
        return await TextFile.load(this.getAbsolutePath(filename));
    }
  }
}
