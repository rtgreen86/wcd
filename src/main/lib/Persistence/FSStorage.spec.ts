import { stat } from 'node:fs/promises';
import { join } from 'node:path';
import { app } from 'electron';

import FSStorage from './FSStorage';

describe('FSStorage', () => {
  type TestData = { content: string };

  let filePath: string;

  beforeAll(() => {
    filePath = join(app.getPath('appData'), 'test-data.json');
  });

  let storage: FSStorage<TestData>;

  beforeAll(() => {
    storage = new FSStorage<TestData>(filePath)
  });

  beforeAll(async () => {
    await storage.put({
      version: 1,
      items: [
        {
          content: 'test content',
        }
      ]
    });
  })

  it('should create file with data', async () => {
    await expect(stat(filePath)).resolves.toBeTruthy();
  });

  it('should persist data', async function () {
    await expect(storage.get()).resolves.toEqual({
      version: 1,
      items: [
        {
          content: 'test content',
        }
      ]
    });
  });
});
