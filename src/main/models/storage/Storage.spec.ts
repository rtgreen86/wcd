import { jest } from '@jest/globals';
import { tmpdir } from 'node:os';
import { mkdtemp, rm, stat } from 'node:fs/promises';
import { join } from 'node:path';
import { Storage } from './Storage';
import { KeyGenerator } from '../secure-storage';

jest.mock('electron');
jest.mock('../secure-storage');

import { Secret } from '../secure-storage';
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

  beforeAll(async () => {
    const hexKey = KeyGenerator.generate();
    jest.mocked(Secret.get).mockResolvedValue(hexKey);
  });

  it('should save / load content', async () => {
    const filename = 'test-file.txt';
    const sourceContent = 'Hello World!';
    await Storage.encryptPut(filename, sourceContent);
    const resultContent = await Storage.encryptGet(filename);
    expect(resultContent).toEqual(sourceContent);
    const status = await stat(join(temp, filename));
    expect(status.isFile()).toBe(true);
  });
});
