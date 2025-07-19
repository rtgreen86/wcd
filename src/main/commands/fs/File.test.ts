import os from 'node:os';
import path from 'node:path';
import { mkdtemp, rm } from 'node:fs/promises';
import GetFileContent from './GetFileContent';
import PutFileContent from './PutFileContent';

describe('File', () => {
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
    await new PutFileContent({
      filename: tempFile,
      content: testContent
    }).execute();
    const actual = await new GetFileContent({
      filename: tempFile
    }).execute();
    expect(actual).toBe(testContent);
  });
});
