import { Buffer } from 'node:buffer';
import { randomBytes, createCipheriv, createDecipheriv } from 'node:crypto';
import { pipeline } from 'node:stream/promises';
import { text } from 'node:stream/consumers';
import { compose, Readable } from 'node:stream';
import { BinaryFile, WriteableFile } from '../file-system';
import { KeyStorage } from './types';
import * as CONST from './const';

export class EncryptedTextFile implements WriteableFile<string> {
  private readonly baseFile: BinaryFile;

  constructor(
    path: string,
    private readonly keyStorage: KeyStorage
  ){
    this.baseFile = new BinaryFile(path);
  }

  get name() {
    return this.baseFile.name;
  }

  get path() {
    return this.baseFile.path;
  }

  async read(): Promise<string> {
    const encryptedStream = this.baseFile.createReadStream();
    const iv = await readBytes(encryptedStream, CONST.CRYPTO_IV_SIZE);
    const key = await this.keyStorage.get();
    const decipher = createDecipheriv(CONST.CRYPTO_ALGORITHM, key, iv);
    const decryptedStream = compose(encryptedStream, decipher);
    return await text(decryptedStream);

  }

  async write(data: string) {
    const stream = this.baseFile.createWriteStream();
    const iv = randomBytes(CONST.CRYPTO_IV_SIZE);
    const key = await this.keyStorage.get();
    const cipher = createCipheriv(CONST.CRYPTO_ALGORITHM, key, iv);
    stream.write(iv);
    await pipeline(Readable.from(data), cipher, stream);
  }

  canRead() {
    return this.baseFile.canRead();
  }

  canWrite() {
    return this.baseFile.canWrite();
  }

  remove() {
    return this.baseFile.remove();
  }
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
      if (!buffer || buffer.length < CONST.CRYPTO_IV_SIZE) {
        reject(new Error('File is empty or corrupted.'));
        return;
      }
      resolve(buffer);
    };

    stream.once('error', handleError);
    stream.once('end', handleEnd);
    handleReadable();
  });
}
