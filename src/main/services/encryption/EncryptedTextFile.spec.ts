import { app } from 'electron';
import { jest } from '@jest/globals';
import { join } from 'node:path';
import { EncryptedTextFile } from './EncryptedTextFile';
import { KeyStorage } from './types';
import * as CONST from './const';

describe('EncryptedTextFile', () => {
  const testContent = 'Hello, world!';
  const encryptedFile = 'encrypted-file.enc';
  const hexKey = new Array(CONST.CRYPTO_KEY_SIZE / 2).fill('0').join('');
  const key = Buffer.alloc(CONST.CRYPTO_KEY_SIZE, hexKey, 'hex');

  const keyStorageMock = {
    get: jest.fn<KeyStorage["get"]>().mockResolvedValue(key)
  };

  it('should save and load encrypted content', async () => {
    const temp = app.getPath('temp');
    const filepath = join(temp, encryptedFile);
    const file = new EncryptedTextFile(filepath, keyStorageMock);
    await file.write(testContent);
    await expect(file.read()).resolves.toEqual(testContent);
  });
});
