import { app } from 'electron';
import path from 'node:path';
import { mkdtemp, rm } from 'node:fs/promises';
import GetAppDataContent from './GetAppDataContent';
import PutAppDataContent from './PutAppDataContent';

describe('AppData', () => {
  const testContent = '"Hello, world!"';
  const testFile = 'test.json';

  let appDataDir: string;

  beforeAll(async () => {
    appDataDir = await mkdtemp(path.join(app.getPath('userData'), 'wcd-test-'));
    console.log('Temp directory: %s', appDataDir);
  });

  afterAll(async () => {
    console.log('Removing directory: %s', appDataDir);
    // await rm(appDataDir, { recursive: true });
  });

  it('should save and load content from file', async () => {
    await new PutAppDataContent({
      filename: testFile,
      content: testContent
    }).execute();

    const actual = await new GetAppDataContent({
      filename: testFile
    }).execute();

    expect(actual).toBe(testContent);
  });
});
