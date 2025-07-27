import { app } from 'electron';
import path from 'node:path';
import { mkdtemp, rm } from 'node:fs/promises';
import AppData from './AppData';
import * as CONST from '@main/CONST';

describe('AppData', () => {
  const testContent = '"Hello, world!"';

  let appDataDir: string;

  beforeAll(async () => {
    appDataDir = await mkdtemp(path.join(app.getPath('userData'), 'wcd-test-'));
    console.log('Temp directory: %s', appDataDir);
  });

  describe('plain text', () => {
    const testFile = 'test.json';

    it('should save and load content from file', async () => {
      await AppData.put(testFile, testContent);
      const actual = await AppData.get(testFile);
      expect(actual).toBe(testContent);
    });
  });

  describe('encrypted', () => {
    const testFile = 'test.json.enc';
    const hexKey = new Array(CONST.FS_ENCRYPTION_KEY_SIZE / 2).fill('0').join('');

    it('should save and load content from file', async () => {
      await AppData.putEncrypted(testFile, hexKey, testContent);
      const actual = await AppData.getEncrypted(testFile, hexKey);
      expect(actual).toBe(testContent);
    });
  });
});
