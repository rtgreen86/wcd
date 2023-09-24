import File from './File';
import AbstractFile from './AbstractFile';
import { FileType } from './FileType';
import { createWriteStream, createReadStream } from 'node:fs';
import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto';
import { pipeline, finished } from 'node:stream/promises';
import { Buffer } from 'node:buffer';
import { Writable } from 'node:stream';

const algorithm = 'aes-192-cbc';

const keySize = 24;

export default class EncryptedFile extends AbstractFile<string> {
  readonly fileType: FileType.TEXT;

  readonly path: string;

  readonly hexKey: string;

  constructor(path: string, hexKey: string) {
    super();
    this.path = path;
    this.hexKey = hexKey;
  }

  async save() {
    const output = createWriteStream(this.path);
    const encrypter = createEncrypter(output, this.hexKey);
    encrypter.write(this.content);
    encrypter.end();
    return finished(encrypter);
  }

  static load(path: string, hexKey: string): Promise<File<string>> {
    return new Promise((resolve, reject) => {
      const key = Buffer.alloc(keySize, hexKey, 'hex');
      const stream = createReadStream(path);

      let iv: Buffer;
      const chunks: string[] = [];

      function onEnd() {
        const file = new EncryptedFile(path, hexKey);
        file.content = chunks.join('');
        resolve(file);
      }

      function onReadable() {
        if (!iv) {
          iv = stream.read(16);
        }
        if (!iv) return;

        stream.off('readable', onReadable);
        stream.off('end', onEnd);

        const decipher = createDecipheriv(algorithm, key, iv);

        decipher.on('readable', () => {
          let chunk;
          do {
            chunk = decipher.read();
            if (chunk) chunks.push(chunk);
          } while (chunk);
        });

        decipher.on('end', onEnd);
        decipher.on('error', reject);

        decipher.setEncoding('utf8');
        stream.pipe(decipher);
      }

      stream.on('error', reject);
      stream.on('end', onEnd);
      stream.on('readable', onReadable);
    });
  }
}

function createEncrypter(writable: Writable, hexKey: string) {
  const key = Buffer.alloc(keySize, hexKey, 'hex');
  const iv = randomBytes(16);
  const cipher = createCipheriv(algorithm, key, iv);
  writable.write(iv);
  pipeline(cipher, writable);
  return cipher;
}
