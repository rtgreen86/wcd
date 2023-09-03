import { app } from 'electron';
import { join, parse } from 'node:path';

import { FileType } from '../files/FileType';
import Directory from './Directory';

import File from '../files/File'
import FileFactory from '../files/FileFactory';
import TextFile from '../files/TextFile';
import JsonFile from '../files/JsonFile';

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
        return FileFactory.createJsonFile<Type>(this.getAbsolutePath(filename));
      case FileType.TEXT:
        return FileFactory.createTextFile(this.getAbsolutePath(filename));
      default:
        throw new Error('Not supported file type.');
    }
  }

  load(filename: string, type: FileType.TEXT): Promise<File<string>>;
  load<Type>(filename: string, type: FileType.JOSN): Promise<File<Type>>
  load<Type>(filename: string, type: FileType) {
    switch (type) {
      case FileType.JOSN:
        return FileFactory.loadJsonFile<Type>(this.getAbsolutePath(filename));
      case FileType.TEXT:
        return FileFactory.loadTextFile(this.getAbsolutePath(filename));
      default:
        throw new Error('Not supported file type.');
    }
  }
}
