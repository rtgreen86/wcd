import { randomBytes } from 'node:crypto';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { loadEncryptedFile, saveEncryptedFile } from './fs-encrypted';

describe('fs-encrypted-ops', () => {
  const content = 'Hello World! This is test clear text.';

  const filename = 'test-file.dat';

  const keySize = 24;

  let tmpDir: string;

  let key: string;

  beforeAll(async () => {
    tmpDir = await mkdtemp(join(tmpdir(), 'wcd-test-'));
  });

  afterAll(async () => {
    await rm(tmpDir, { recursive: true });
  });

  beforeAll(async () => {
    key = (await randomBytes(keySize)).toString('hex');
  });

  it('should save and load text to fs', async () => {
    const pathToFile = join(tmpDir, filename);

    await saveEncryptedFile(pathToFile, key, content);

    const loadPromise = loadEncryptedFile(pathToFile, key);

    await expect(loadPromise).resolves.toEqual(content);
  });
});