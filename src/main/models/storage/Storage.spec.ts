import { jest } from '@jest/globals';
import Storage from './Storage';
import { tmpdir } from 'node:os';
import { mkdtemp, rm, stat } from 'node:fs/promises';
import { join } from 'node:path';

jest.mock('electron');

import { app } from 'electron';

describe('Storage', () => {
  let temp: string;

  beforeAll(async () => {
    console.log('Creating directory at %s...', temp);
    temp = await mkdtemp(join(tmpdir(), 'wcd-'));
  });

  afterAll(async () => {
    console.log('Removing directory at %s...', temp);
    await rm(temp, { recursive: true });
  });

  beforeAll(() => {
    jest.mocked(app.getPath).mockReturnValue(temp);
  });

  it('should save / load content', async () => {
    const filename = 'test-file.txt';
    const sourceContent = 'Hello World!';
    await Storage.put(filename, sourceContent);
    const resultContent = await Storage.get(filename);
    expect(resultContent).toEqual(sourceContent);
    const status = await stat(join(temp, filename));
    expect(status.isFile()).toBe(true);
  });
});
