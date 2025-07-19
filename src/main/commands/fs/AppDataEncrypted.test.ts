import { app } from 'electron';
import path from 'node:path';
import { mkdtemp } from 'node:fs/promises';
import * as CONST from '@main/CONST';
import GetAppDataEncryptedContent from './GetAppDataEncryptedContent';
import PutAppDataEncryptedContent from './PutAppDataEncryptedContent';

describe('AppDataEncrypted', () => {
  const testContent = '"Hello, world!"';
  const testFile = 'test.json.enc';
  const hexKey = new Array(CONST.FS_ENCRYPTION_KEY_SIZE / 2).fill('0').join('');

  let appDataDir: string;

  beforeAll(async () => {
    appDataDir = await app.getPath('userData');
    console.log('Temp directory: %s', appDataDir);
  });

  afterAll(async () => {
    console.log('Removing directory: %s', appDataDir);
  });

  it('should save and load content from file', async () => {
    await new PutAppDataEncryptedContent({
      filename: testFile,
      hexKey,
      content: testContent
    }).execute();

    const actual = await new GetAppDataEncryptedContent({
      filename: testFile,
      hexKey
    }).execute();

    expect(actual).toBe(testContent);
  });
});
