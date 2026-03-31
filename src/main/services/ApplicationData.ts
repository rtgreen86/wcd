import { app } from 'electron';
import { Buffer } from 'node:buffer';
import { Readable } from 'node:stream';
import path from 'node:path';
import * as FileSystem from './FileSystem'

export function canRead(filename: string) {
  return FileSystem.canRead(buildAppDataPath(filename));
}

export function getBinnaryFile(filename: string): Promise<Buffer> {
  return FileSystem.getBinnaryFile(buildAppDataPath(filename));
}

export function getTextFile(filename: string): Promise<string> {
  return FileSystem.getTextFile(buildAppDataPath(filename));
}

export function getEncryptedFile(filename: string, hexKey: string): Promise<string> {
  return FileSystem.getEncryptedFile(buildAppDataPath(filename), hexKey);
}

export async function putBinnaryFile(filename: string, content: Buffer) {
  await FileSystem.putBinnaryFile(buildAppDataPath(filename), content);
}

export async function putTextFile(filename: string, content: string) {
  await FileSystem.putTextFile(buildAppDataPath(filename), content);
}

export async function putEncryptedFile(filename: string, hexKey: string, content: string) {
  await FileSystem.putEncryptedFile(buildAppDataPath(filename), hexKey, content);
}

export async function removeFile(filename: string) {
  await FileSystem.removeFile(buildAppDataPath(filename));
}

export function buildAppDataPath(filename: string) {
  return path.join(app.getPath('userData'), `wcd-${path.basename(filename)}`);
}

export function buildExportPath(filename: string) {
  return path.join(app.getPath('documents'), path.basename(filename));
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
