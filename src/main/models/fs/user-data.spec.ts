import { randomBytes } from 'node:crypto';
import { getAbsolutePath, put, get } from './user-data';
import { join } from 'node:path';
import { app } from 'electron';

describe('fs', () => {
  const filename = 'user-file.dat';

  const content = 'Hello World! This is a test content for test file.';

  const keySize = 24;

  let key: string;

  beforeAll(async () => {
    key = (await randomBytes(keySize)).toString('hex');
  });

  it.each([
    ['test-file.json', 'wc-test-file.json'],
    ['./test-file.json', 'wc-test-file.json'],
    ['../test-file.json', 'wc-test-file.json'],
    ['/test-file.json', 'wc-test-file.json'],
    ['subfolder/test-file.json', 'wc-test-file.json'],
  ])('should build path to %s', (filename, expected) => {
    expect(getAbsolutePath(filename)).toEqual(join(app.getPath('userData'), expected));
  });

  it('should load content from fs', async () => {
    await put(filename, key, content);
    const loadPromise = get(filename, key);
    await expect(loadPromise).resolves.toEqual(content);
  });
});
