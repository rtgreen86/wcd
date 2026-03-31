import { app } from 'electron';
import { jest } from '@jest/globals';
import { mkdtemp, rm } from 'node:fs/promises';
import * as CONST from '@main/Const';
import os from 'node:os';
import path, { join } from 'node:path';
import * as FileSystem from './FileSystem';

jest.mock('electron');

describe('FileSystem', () => {
  const testContent = 'Hello, world!';
  const textFile = 'text-file.txt';
  const encryptedFile = 'encrypted-file.enc';
  const hexKey = new Array(CONST.FS_ENCRYPTION_KEY_SIZE / 2).fill('0').join('');

  let tempDir: string;

  beforeAll(async () => {
    tempDir = await mkdtemp(path.join(os.tmpdir(), 'wcd-'));
    console.log('Temp directory: %s', tempDir);
  });

  beforeEach(() => {
    jest.resetAllMocks();
    jest.mocked(app.getPath).mockReturnValue(tempDir);
  });

  afterAll(async () => {
    console.log('Removing directory: %s', tempDir);
    await rm(tempDir, { recursive: true });
  });

  it('should save and load text files', async () => {
    const file = path.join(tempDir, textFile);
    await FileSystem.putTextFile(file, testContent);
    const actual = await FileSystem.getTextFile(file);
    expect(actual).toBe(testContent);
  });

  it('should save and load encrypted content', async () => {
    const file = path.join(tempDir, encryptedFile);
    await FileSystem.putEncryptedFile(file, hexKey, testContent);
    const actual = await FileSystem.getEncryptedFile(file, hexKey);
    expect(actual).toBe(testContent);
  });
});
