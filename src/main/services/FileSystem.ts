import { Buffer } from 'node:buffer';
import { readFile, writeFile, unlink, access, constants } from 'node:fs/promises';

export async function canRead(filename: string) {
  try {
    await access(filename, constants.R_OK);
    return true;
  } catch (error) {
    return false;
  }
}

export async function canWrite(filename: string) {
  try {
    await access(filename, constants.W_OK);
    return true;
  } catch (error) {
    return false;
  }
}

export function getBinnaryFile(filename: string): Promise<Buffer> {
  return readFile(filename);
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

export async function removeFile(filename: string) {
  await unlink(filename);
}
