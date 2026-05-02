import { Buffer } from 'node:buffer';
import { randomBytes, getCiphers, createCipheriv, createDecipheriv } from 'node:crypto';
import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline, finished } from 'node:stream/promises';
import { Readable } from 'node:stream';
import { safeStorage } from 'electron';
import { getBinnaryFile, putBinnaryFile, canRead } from './FileSystem';
import { buildAppDataPath } from './FileSystemFolders';


const MASTERKEY_ENCRYPTED_FILENAME = 'master-key.enc';
const CRYPTO_ALGORITHM = 'aes-192-cbc';
const CRYPTO_IV_SIZE = 16;
const CRYPTO_KEY_SIZE = 24;


export function createKey() {
  const buffer = randomBytes(CRYPTO_KEY_SIZE);
  return buffer.toString('hex');
}

export async function getKey() {
  const filePath = buildAppDataPath(MASTERKEY_ENCRYPTED_FILENAME);
  const buffer = await getBinnaryFile(filePath);
  return safeStorage.decryptString(buffer);
}

export async function putKey(key: string) {
  const buffer = safeStorage.encryptString(key);
  const filePath = buildAppDataPath(MASTERKEY_ENCRYPTED_FILENAME);
  await putBinnaryFile(filePath, buffer);
}

export function isKeyExists() {
  const filePath = buildAppDataPath(MASTERKEY_ENCRYPTED_FILENAME);
  return canRead(filePath);
}

export function isSafeStorageSupported() {
  const isAvailable = safeStorage.isEncryptionAvailable();
  if (isAvailable) {
    const backend = safeStorage.getSelectedStorageBackend();
    console.log(backend)
    return backend !== 'basic_text' && backend !== 'unknown';
  }
  return false;
}

export function isEncryptionSupported() {
  const ciphers = getCiphers();
  return ciphers.includes(CRYPTO_ALGORITHM);
}

export async function getEncryptedFile(filename: string, hexKey: string): Promise<string> {
  const stream = createReadStream(filename);
  const key = Buffer.alloc(CRYPTO_KEY_SIZE, hexKey, 'hex');
  const iv = await readBytes(stream, CRYPTO_IV_SIZE);
  const decipher = createDecipheriv(CRYPTO_ALGORITHM, key, iv);
  stream.pipe(decipher);
  return readAllText(decipher);
}

export async function putEncryptedFile(filename: string, hexKey: string, content: string) {
  const stream = createWriteStream(filename);
  const iv = randomBytes(CRYPTO_IV_SIZE);
  const bufferWithKey = Buffer.alloc(CRYPTO_KEY_SIZE, hexKey, 'hex');
  const cipher = createCipheriv(CRYPTO_ALGORITHM, bufferWithKey, iv);
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
