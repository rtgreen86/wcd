import { Buffer } from 'node:buffer';
import { createReadStream } from 'node:fs';
import { createDecipheriv } from 'node:crypto';
import { Readable } from 'node:stream';
import { Command } from '@shared/types';
import * as CONST from '@main/CONST';

export default class GetFileEncryptedContent implements Command<Promise<string>> {
  constructor(private params: {
    filename: string,
    hexKey: string,
  }) {}

  async execute() {
    const stream = createReadStream(this.params.filename);
    const key = Buffer.alloc(CONST.FS_ENCRYPTION_KEY_SIZE, this.params.hexKey, 'hex');
    const iv = await readBytes(stream, CONST.FS_ENCRYPTION_IV_SIZE);
    const decipher = createDecipheriv(CONST.FS_ALGORITHM, key, iv);
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


