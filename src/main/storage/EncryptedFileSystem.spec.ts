import os from 'node:os';
import path from 'node:path';
import { mkdtemp, rm } from 'node:fs/promises';

import EncryptedFileSystem from './EncryptedFileSystem';

const keySize = 24;

describe('FileSystem', () => {
  const testContent = 'Hello, world!';
  const file = 'test.txt';
  const hexKey = new Array(keySize / 2).fill('0').join('');

  let tempDir: string;

  beforeAll(async () => {
    tempDir = await mkdtemp(path.join(os.tmpdir(), 'wcd-'));
    console.log('Temp directory: %s', tempDir);
  });

  afterAll(async () => {
    console.log('Removing directory: %s', tempDir);
    await rm(tempDir, { recursive: true });
  });

  it('should save and load string content from file', async () => {
    const tempFile = path.join(tempDir, file);
    const storage = new EncryptedFileSystem(tempFile, hexKey);
    await storage.save(testContent);
    const loaded = await storage.load();
    expect(loaded).toBe(testContent);
  });
});
