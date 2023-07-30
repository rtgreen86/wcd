import { stat } from 'node:fs/promises';
import { join } from 'node:path';
import { app } from 'electron';

import FSStorage from './FSStorage';

describe('FSStorage', () => {
  let storage: FSStorage<{ content: string }>;

  beforeAll(() => {
    storage = new FSStorage<{ content: string }>('test-data.json')
  });

  beforeAll(async () => {
    await storage.put([{ content: 'test content' }]);
  });

  it('should create file with data', async () => {
    await expect(stat(join(app.getPath('userData'), 'test-data.json'))).resolves.toBeTruthy();
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
