import os from 'node:os';
import path from 'node:path';
import { mkdtemp, rm } from 'node:fs/promises';
import FileSystem from './FileSystem';

describe('FileSystem', () => {
  const testContent = 'Hello, world!';
  const file = 'test.txt';

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
    await FileSystem.put(tempFile, testContent);
    const actual = await FileSystem.get(tempFile);
    expect(actual).toBe(testContent);
  });
});
