import { Buffer } from 'node:buffer';
import { createReadStream, createWriteStream } from 'node:fs';
import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto';
import { pipeline, finished } from 'node:stream/promises';
import { Readable } from 'node:stream';
import { Storage } from './Storage';

const keySize = 24;
const ivSize = 16;
const algorithm = 'aes-192-cbc';

export default class EncryptedFileSystem implements Storage<string> {
  constructor(private file: string, private hexKey: string) {}

  async save(content: string): Promise<void> {
    const stream = createWriteStream(this.file);
    const iv = randomBytes(ivSize);
    const bufferWithKey = Buffer.alloc(keySize, this.hexKey, 'hex');
    const cipher = createCipheriv(algorithm, bufferWithKey, iv);
    pipeline(cipher, stream);
    stream.write(iv);
    cipher.write(content);
    cipher.end();
    return finished(cipher);
  }

  async load(): Promise<string> {
    const stream = createReadStream(this.file);
    const key = Buffer.alloc(keySize, this.hexKey, 'hex');
    const iv = await readBytes(stream, ivSize);
    const decipher = createDecipheriv(algorithm, key, iv);
    stream.pipe(decipher);
    return readAllText(decipher);
  }
}

const readBytes = (stream: Readable, byteSize: number) => new Promise<Buffer>((resolve, reject) => {
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

const readAllText = (stream: Readable) => new Promise<string>((resolve, reject) => {
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
