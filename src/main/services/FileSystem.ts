import { app } from 'electron';
import { Buffer } from 'node:buffer';
import { createCipheriv, randomBytes } from 'node:crypto';
import { createDecipheriv } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { createWriteStream } from 'node:fs';
import { pipeline, finished } from 'node:stream/promises';
import { Readable } from 'node:stream';
import { readFile, writeFile } from 'node:fs/promises';
import * as CONST from '@main/CONST';
import path from 'node:path';

export default class FileSystem {
  static getTextFile(filename: string): Promise<string> {
    return readFile(filename, 'utf8');
  }

  static async putTextFile(filename: string, content: string) {
    await writeFile(filename, content, 'utf8');
  }

  static async getEncryptedFile(filename: string, hexKey: string): Promise<string> {
    const stream = createReadStream(filename);
    const key = Buffer.alloc(CONST.FS_ENCRYPTION_KEY_SIZE, hexKey, 'hex');
    const iv = await readBytes(stream, CONST.FS_ENCRYPTION_IV_SIZE);
    const decipher = createDecipheriv(CONST.FS_ALGORITHM, key, iv);
    stream.pipe(decipher);
    return readAllText(decipher);
  }

  static async putEncryptedFile(filename: string, hexKey: string, content: string) {
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

  static getAppDataTextFile(filename: string): Promise<string> {
    return FileSystem.getTextFile(FileSystem.buildAppDataPath(filename));
  }

  static putAppDataTextFile(filename: string, content: string) {
    return FileSystem.putTextFile(FileSystem.buildAppDataPath(filename), content);
  }

  static getAppDataEncryptedFile(filename: string, hexKey: string): Promise<string> {
    return FileSystem.getEncryptedFile(FileSystem.buildAppDataPath(filename), hexKey);
  }

  static putAppDataEncryptedFile(filename: string, hexKey: string, content: string) {
    return FileSystem.putEncryptedFile(FileSystem.buildAppDataPath(filename), hexKey, content);
  }

  static buildAppDataPath(filename: string) {
    return path.join(app.getPath('userData'), `wcd-${path.basename(filename)}`);
  }

  static buildExportPath(filename: string) {
    return path.join(app.getPath('documents'), path.basename(filename));
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
