import { createWriteStream, createReadStream } from 'node:fs';
import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto';
import { pipeline, finished } from 'node:stream/promises';
import { Buffer } from 'node:buffer';

const KEY_SIZE = 24;

const IV_SIZE = 16;

const ALGORITHM = 'aes-192-cbc';

export function encryptedSave(filename: string, hexKey: string, content: string) {
  const stream = createWriteStream(filename);

  const key = Buffer.alloc(KEY_SIZE, hexKey, 'hex');
  const iv = randomBytes(IV_SIZE);
  const cipher = createCipheriv(ALGORITHM, key, iv);

  pipeline(cipher, stream);

  stream.write(iv);
  cipher.write(content);
  cipher.end();
  return finished(cipher);
}

export function encryptedLoad(filename: string, hexKey: string) {
  return new Promise((resolve, reject) => {
    const key = Buffer.alloc(KEY_SIZE, hexKey, 'hex');
    const stream = createReadStream(filename);

    let iv: Buffer;
    const chunks: string[] = [];

    function onEnd() {
      resolve(chunks.join(''));
    }

    function onReadable() {
      if (!iv) {
        iv = stream.read(16);
      }
      if (!iv) return;

      stream.off('readable', onReadable);
      stream.off('end', onEnd);

      const decipher = createDecipheriv(ALGORITHM, key, iv);

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
