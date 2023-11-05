import { createWriteStream, createReadStream } from 'node:fs';
import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto';
import { pipeline, finished } from 'node:stream/promises';
import { Buffer } from 'node:buffer';
import { Readable } from 'node:stream';

const KEY_SIZE = 24;

const IV_SIZE = 16;

const ALGORITHM = 'aes-192-cbc';

export function saveEncryptedFile(filename: string, hexKey: string, content: string) {
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

export async function loadEncryptedFile(filename: string, hexKey: string) {
  const key = Buffer.alloc(KEY_SIZE, hexKey, 'hex');
  const stream = createReadStream(filename);
  const iv = await readIV(stream);
  const decipher = createDecipheriv(ALGORITHM, key, iv);
  stream.pipe(decipher);
  return readContent(decipher);
}


function readIV(stream: Readable): Promise<Buffer> | null {
  return new Promise((resolve, reject) => {
    const handleReadable = () => {
      const iv = stream.read(IV_SIZE);

      if (iv === null) {
        stream.once('readable', handleReadable);
        return;
      }

      resolve(iv);
    };

    stream.once('readable', handleReadable);
    stream.once('error', reject);
    stream.once('end', () => resolve(null));
  });
}

function readContent(stream: Readable) {
  return new Promise((resolve, reject) => {
    const chunks = [] as string[];

    stream.on('error', reject);

    stream.on('end', () => {
      resolve(chunks.join(''));
    });

    stream.on('readable', () => {
      let chunk;
      while (null !== (chunk = stream.read())) {
        chunks.push(chunk);
      }
    });
  });
}
