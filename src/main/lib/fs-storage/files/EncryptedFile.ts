import File from './File';
import AbstractFile from './AbstractFile';
import { FileType } from './FileType';
import { createWriteStream, createReadStream } from 'node:fs';
import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto';
import { pipeline } from 'node:stream';
import { Buffer } from 'node:buffer';

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

  save() {
    return new Promise<void>((reslove, reject) => {
        const key = Buffer.alloc(keySize, this.hexKey, 'hex');
        const iv = randomBytes(16);
        const cipher = createCipheriv(algorithm, key, iv);
        const output = createWriteStream(this.path);
        output.write(iv);
        pipeline(cipher, output, (err) => {
          if (err) return reject(err);
        });
        cipher.on('end', () => reslove());
        cipher.write(this.content);
        cipher.end();
      });
  }

  static load(path: string, hexKey: string): Promise<File<string>> {
    return new Promise((resolve, reject) => {
      const key = Buffer.alloc(keySize, hexKey, 'hex');

      const input = createReadStream(path);

      input.once('readable', () => {
        const iv = input.read(16);
        const decipher = createDecipheriv(algorithm, key, iv);

        decipher.on('error', reject);

        let decrypted = '';

        decipher.on('readable', () => {
          let chunk;
          while (null !== (chunk = decipher.read())) {
            decrypted += chunk.toString('utf8');
          }
        });

        decipher.on('end', () => {
          const file = new EncryptedFile(path, hexKey);
          file.content = decrypted;
          resolve(file);
        });

        input.pipe(decipher)
        let chunk;
        while (null !== (chunk = decipher.read())) {
          decrypted += chunk.toString('utf8');
        }
      });
    }) as Promise<File<string>>;
  }
}
