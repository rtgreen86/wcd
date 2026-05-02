import { app } from 'electron';
import { jest } from '@jest/globals';
import { mkdtemp, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import * as FileSystemCrypto from './FileSystemCrypto';

jest.mock('electron');

describe('FileSystemCrypto', () => {
  const CRYPTO_KEY_SIZE = 24;

  const testContent = 'Hello, world!';
  const encryptedFile = 'encrypted-file.enc';
  const hexKey = new Array(CRYPTO_KEY_SIZE / 2).fill('0').join('');

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

  it('should save and load encrypted content', async () => {
    const file = path.join(tempDir, encryptedFile);
    await FileSystemCrypto.putEncryptedFile(file, hexKey, testContent);
    const actual = await FileSystemCrypto.getEncryptedFile(file, hexKey);
    expect(actual).toBe(testContent);
  });
});
