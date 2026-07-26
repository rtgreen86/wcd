import { readFile, writeFile } from 'node:fs/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import { Buffer } from 'node:buffer';
import { Readable, Writable } from 'node:stream';
import { File } from './File';

export class BinaryFile extends File<Buffer> {
  read(): Promise<Buffer> {
    return readFile(this.path);
  }

  write(data: Buffer) {
    return writeFile(this.path, data);
  }

  createReadStream(): Readable {
    return createReadStream(this.path);
  }

  createWriteStream(): Writable {
    return createWriteStream(this.path);
  }
}
