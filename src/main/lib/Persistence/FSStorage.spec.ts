import { usingFs } from '../MainTestUtility';

import { stat } from 'node:fs/promises';
import { join } from 'node:path';

import FSStorage from './FSStorage';


describe('FSStorage', usingFs((testFs) => {
  type TestData = { content: string };

  let filePath: string;

  beforeAll(() => {
    filePath = join(testFs.pathToDir, 'test-data.json');
  });

  it('should persist data', async function () {
    const storage = new FSStorage<TestData>(filePath);
    await storage.put({
      version: 1,
      items: [
        {
          content: 'test content',
        }
      ]
    });
    await expect(stat(filePath)).resolves.toBeTruthy();
    await expect(storage.get()).resolves.toEqual({
      version: 1,
      items: [
        {
          content: 'test content',
        }
      ]
    });
  });
}));
