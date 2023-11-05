import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { loadFile, saveFile } from './fs';

describe('fs-ops', () => {
  const content = 'Hello World!';

  const filename = 'test-file.txt';

  let tmpDir: string;

  beforeAll(async () => {
    tmpDir = await mkdtemp(join(tmpdir(), 'wcd-test-'));
  });

  afterAll(async () => {
    await rm(tmpDir, { recursive: true });
  });

  it('should save and load text to fs', async () => {
    const pathToFile = join(tmpDir, filename);

    await saveFile(pathToFile, content);

    const loadPromise = loadFile(join(tmpDir, filename));

    await expect(loadPromise).resolves.toEqual(content);
  });
})