import File from './File';
import AbstractFile from './AbstractFile';
import { FileType } from './FileType';
import { createWriteStream, createReadStream } from 'node:fs';
import { scrypt, randomFill, createCipheriv, scryptSync, createDecipheriv } from 'node:crypto';
import { pipeline } from 'node:stream';

const algorithm = 'aes-192-cbc';
const secret = 'Password used to generate key';
const salt = 'salt';
const keySize = 24;

export default class EncryptedFile extends AbstractFile<string> {
  readonly fileType: FileType.TEXT;

  readonly path: string;

  constructor(path: string) {
    super();
    this.path = path;
  }

  save() {
    return new Promise<void>((reslove, reject) => {
      scrypt(secret, salt, keySize, (err, key) => {
        if (err) return reject(err);

        randomFill(new Uint8Array(16), (err, iv) => {
          if (err) return reject(err);

          const iv2 = Buffer.alloc(16, 0);

          const cipher = createCipheriv(algorithm, key, iv2);

          const output = createWriteStream(this.path);


          output.write(iv2);

          pipeline(cipher, output, (err) => {


            if (err) return reject(err);

          });
          cipher.on('end', () => reslove());

          cipher.write(this.content);
          cipher.end();
        });
      });
    });
  }

  static load(path: string): Promise<File<string>> {
    return new Promise((resolve, reject) => {

      const input = createReadStream(path);



      input.once('readable', () => {

        const key = scryptSync(secret, salt, keySize);
        // const iv = Buffer.alloc(16, 0);
        const iv = input.read(16);
        const decipher = createDecipheriv(algorithm, key, iv);

        let decrypted = '';




        decipher.on('readable', () => {
          // reject('created iv');
          let chunk;
          while (null !== (chunk = decipher.read())) {
            decrypted += chunk.toString('utf8');
          }
        });

        decipher.on('end', () => {
          console.log(decrypted);
          // Prints: some clear text data

          const file = new EncryptedFile(path);
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