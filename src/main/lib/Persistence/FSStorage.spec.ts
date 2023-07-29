import { jest } from '@jest/globals';

import { mkdtemp, rm, stat } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { app } from 'electron';

import FSStorage from './FSStorage';

function isMock<Type extends (...args: Array<unknown>) => unknown>(method: Type): method is jest.MockedFunction<Type> {
  return 'mock' in method;
}

describe('FSStorage', () => {
  let temp: string;

  beforeAll(async () => {
    temp = await mkdtemp(join(tmpdir(), 'wc-test-'), 'utf8');
  })

  afterAll(async () => {
    await rm(temp, { recursive: true })
  });

  beforeAll(() => {
    const getPath = app.getPath;
    if (isMock<typeof getPath>(getPath)) {
      getPath.mockReturnValue(temp);
    }
  });

  type TestData = { content: string };

  const filename = 'test-data.json';

  const items = [
    {
      content: 'test content',
    }
  ];

  let filePath: string;

  beforeAll(() => {
    filePath = join(temp, 'test-data.json');
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
});
