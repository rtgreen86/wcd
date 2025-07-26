import { Buffer } from 'node:buffer';
import { createWriteStream } from 'node:fs';
import { createCipheriv, randomBytes } from 'node:crypto';
import { pipeline, finished } from 'node:stream/promises';
import { Command } from '@shared/types';
import * as CONST from '@main/CONST';

export default class PutFileEncryptedContent implements Command<Promise<void>> {
  constructor(private params: {
    filename: string,
    hexKey: string,
    content: string,
  }) {}

  async execute() {
    const stream = createWriteStream(this.params.filename);
    const iv = randomBytes(CONST.FS_ENCRYPTION_IV_SIZE);
    const bufferWithKey = Buffer.alloc(CONST.FS_ENCRYPTION_KEY_SIZE, this.params.hexKey, 'hex');
    const cipher = createCipheriv(CONST.FS_ALGORITHM, bufferWithKey, iv);
    pipeline(cipher, stream);
    stream.write(iv);
    cipher.write(this.params.content);
    cipher.end();
    return finished(cipher);
  }
}
