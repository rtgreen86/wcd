import { Buffer } from 'node:buffer';
import { createCipheriv, randomBytes } from 'node:crypto';
import { createDecipheriv } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { createWriteStream } from 'node:fs';
import { pipeline, finished } from 'node:stream/promises';
import { Readable } from 'node:stream';
import { readFile, writeFile } from 'node:fs/promises';
import * as CONST from '@main/CONST';


export function getBinnaryFile(filename: string): Promise<Buffer> {
  return readFile(filename);
}

export async function getEncryptedFile(filename: string, hexKey: string): Promise<string> {
  const stream = createReadStream(filename);
  const key = Buffer.alloc(CONST.FS_ENCRYPTION_KEY_SIZE, hexKey, 'hex');
  const iv = await readBytes(stream, CONST.FS_ENCRYPTION_IV_SIZE);
  const decipher = createDecipheriv(CONST.FS_ALGORITHM, key, iv);
  stream.pipe(decipher);
  return readAllText(decipher);
}

export function getTextFile(filename: string): Promise<string> {
  return readFile(filename, 'utf8');
}

export async function putBinnaryFile(filename: string, content: Buffer) {
  await writeFile(filename, content);
}

export async function putTextFile(filename: string, content: string) {
  await writeFile(filename, content, 'utf8');
}

export async function putEncryptedFile(filename: string, hexKey: string, content: string) {
  const stream = createWriteStream(filename);
  const iv = randomBytes(CONST.FS_ENCRYPTION_IV_SIZE);
  const bufferWithKey = Buffer.alloc(CONST.FS_ENCRYPTION_KEY_SIZE, hexKey, 'hex');
  const cipher = createCipheriv(CONST.FS_ALGORITHM, bufferWithKey, iv);
  pipeline(cipher, stream);
  stream.write(iv);
  cipher.write(content);
  cipher.end();
  return finished(cipher);
}


function readBytes(stream: Readable, byteSize: number) {
  return new Promise<Buffer>((resolve, reject) => {
    let buffer: Buffer;

    const unsubscribe = () => {
      stream.off('readable', handleReadable);
      stream.off('end', handleEnd);
      stream.off('error', handleError);
    }

    const handleReadable = () => {
      buffer = stream.read(byteSize);
      if (!buffer) {
        stream.once('readable', handleReadable);
        return;
      }
      handleEnd();
    };

    const handleError = (error: Error) => {
      unsubscribe();
      reject(error);
    };

    const handleEnd = () => {
      unsubscribe();
      resolve(buffer);
    };

    stream.once('error', handleError);
    stream.once('end', handleEnd);
    handleReadable();
  });
}

function readAllText(stream: Readable) {
  return new Promise<string>((resolve, reject) => {
    let chunks: string[] = [];

    const unsubscribe = () => {
      stream.off('readable', handleReadable);
      stream.off('error', handleError);
      stream.off('end', handleEnd);
    };

    const handleReadable = () => {
      let chunk;
      while (null !== (chunk = stream.read())) {
        chunks.push(chunk);
      }
    }

    const handleError = (error: Error) => {
      unsubscribe();
      reject(error);
    };

    const handleEnd = () => {
      unsubscribe();
      resolve(chunks.join(''));
    }

    stream.on('readable', handleReadable);
    stream.once('error', handleError);
    stream.once('end', handleEnd);
    handleReadable();
  });
}
