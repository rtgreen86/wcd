import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { mkdtemp, rm } from 'node:fs/promises';
import { FileEncryptedText } from './FileEncryptedText';

const KEY_SIZE = 24;

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

    const file = new FileEncryptedText(filepath, key);
    await file.write(content);

    const readedContent = await file.read();
    expect(readedContent).toEqual(content);
  });
});
