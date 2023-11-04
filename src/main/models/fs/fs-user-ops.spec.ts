import { loadUserFile, saveUserFile } from './fs-user-ops';
import { randomBytes } from 'node:crypto';

describe('fs', () => {
  const filename = 'user-file.dat';

  const content = 'Hello World! This is a test content for test file.';

  const keySize = 24;

  let key: string;

  beforeAll(async () => {
    key = (await randomBytes(keySize)).toString('hex');
  });

  it('should load content from fs', async () => {
    await saveUserFile(filename, key, content);
    const loadPromise = loadUserFile(filename, key);
    await expect(loadPromise).resolves.toEqual(content);
  });
});
