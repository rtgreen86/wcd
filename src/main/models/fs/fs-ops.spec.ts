import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { save, load } from './fs-ops';

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
    await save(join(tmpDir, filename), content);
    await expect(load(join(tmpDir, filename))).resolves.toEqual(content);
  });
})