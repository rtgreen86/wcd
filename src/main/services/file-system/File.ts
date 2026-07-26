import { parse, normalize } from 'node:path';
import { unlink, access, constants } from 'node:fs/promises';
import { WriteableFile } from './types';

export abstract class File<T = unknown> implements WriteableFile<T> {
  readonly path;

  constructor(path: string) {
    this.path = normalize(path);
  }

  get name() {
    return parse(this.path).base;
  }

  async canRead() {
    try {
      await access(this.path, constants.R_OK);
      return true;
    } catch (error) {
      return false;
    }
  }

  async canWrite() {
    try {
      await access(this.path, constants.W_OK);
      return true;
    } catch (error) {
      return false;
    }
  }

  abstract read(): Promise<T>

  abstract write(data: T): Promise<void>

  async remove() {
    await unlink(this.path);
  }
}
