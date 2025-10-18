import os from 'node:os';
import path from 'node:path';
import { mkdtemp, rm } from 'node:fs/promises';
import * as CONST from '@main/CONST';

import {
  getTextFile,
  putTextFile,
  getEncryptedFile,
  putEncryptedFile
} from './fileSystemStorage';

describe('fileSystemStorage', () => {
  const testContent = 'Hello, world!';
  const textFile = 'text-file.txt';
  const encryptedFile = 'encrypted-file.enc';
  const hexKey = new Array(CONST.FS_ENCRYPTION_KEY_SIZE / 2).fill('0').join('');

  let tempDir: string;

  beforeAll(async () => {
    tempDir = await mkdtemp(path.join(os.tmpdir(), 'wcd-'));
    console.log('Temp directory: %s', tempDir);
  });

  afterAll(async () => {
    console.log('Removing directory: %s', tempDir);
    await rm(tempDir, { recursive: true });
  });

  it('should save and load text files', async () => {
    const file = path.join(tempDir, textFile);
    await putTextFile(file, testContent);
    const actual = await getTextFile(file);
    expect(actual).toBe(testContent);
  });

  it('should save and load encrypted content', async () => {
    const file = path.join(tempDir, encryptedFile);
    await putEncryptedFile(file, hexKey, testContent);
    const actual = await getEncryptedFile(file, hexKey);
    expect(actual).toBe(testContent);
  });
});
