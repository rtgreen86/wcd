import os from 'node:os';
import path from 'node:path';
import { mkdtemp, rm } from 'node:fs/promises';
import GetFileEncryptedContent from './GetFileEncryptedContent';
import PutFileEncryptedContent from './PutFileEncryptedContent';
import * as CONST from '@main/CONST';

describe('FileEncrypted', () => {
  const testContent = 'Hello, world!';
  const file = 'test.txt';
  const hexKey = new Array(CONST.FS_ENCRYPTION_KEY_SIZE / 2).fill('0').join('');

  let tempDir: string;
  let tempFile: string;

  beforeAll(async () => {
    tempDir = await mkdtemp(path.join(os.tmpdir(), 'wcd-'));
    tempFile = path.join(tempDir, file);
    console.log('Temp directory: %s', tempDir);
  });

  afterAll(async () => {
    console.log('Removing directory: %s', tempDir);
    await rm(tempDir, { recursive: true });
  });

  it('should save and load string content from file', async () => {
    await new PutFileEncryptedContent({
      filename: tempFile,
      hexKey,
      content: testContent
    }).execute();

    const actual = await new GetFileEncryptedContent({
      filename: tempFile,
      hexKey
    }).execute();

    expect(actual).toBe(testContent);
  });
});
