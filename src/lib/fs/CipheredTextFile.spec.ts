import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { mkdtemp, rm } from 'node:fs/promises';
import { KEY_SIZE } from './const';
import { CipheredTextFile } from './index';

describe('CipheredTextFile', () => {
  let tmp: string;

  beforeAll(async () => {
    tmp = await mkdtemp(join(tmpdir(), 'wcd-'));
    console.log('Temp directory: %s', tmp);
  });

  afterAll(async () => {
    console.log('Removing directory: %s', tmp);
    await rm(tmp, { recursive: true });
  });

  it('should save / load entrypted data', async () => {
    const filename = 'test.dat';
    const filepath = join(tmp, filename);
    const key = new Array(KEY_SIZE / 2).fill('0').join('');
    const content = 'Hello World!';

    const file = new CipheredTextFile(filepath, key);
    file.content = content;
    await file.save();

    const anotherFile = await CipheredTextFile.load(filepath, key);
    expect(anotherFile.content).toEqual(content);
  });
});
