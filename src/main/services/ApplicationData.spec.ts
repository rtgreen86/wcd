import { app } from 'electron';
import { jest } from '@jest/globals';
import { mkdtemp, rm } from 'node:fs/promises';
import * as CONST from '@main/Const';
import os from 'node:os';
import path, { join } from 'node:path';
import * as AppData from './ApplicationData';

jest.mock('electron');

describe('ApplicationData', () => {
  const testContent = 'Hello, world!';

  let tempDir: string;

  beforeAll(async () => {
    tempDir = await mkdtemp(path.join(os.tmpdir(), 'wcd-'));
    console.log('Temp directory: %s', tempDir);
  });

  beforeEach(() => {
    jest.resetAllMocks();
    jest.mocked(app.getPath).mockReturnValue(tempDir);
  });

  afterAll(async () => {
    console.log('Removing directory: %s', tempDir);
    await rm(tempDir, { recursive: true });
  });

  it('should save and load test content from file', async () => {
    const testFile = 'test.json';
    await AppData.putTextFile(testFile, testContent);
    const actual = await AppData.getTextFile(testFile);
    expect(actual).toBe(testContent);
  });

  describe('encrypted', () => {
    const testFile = 'test.json.enc';
    const hexKey = new Array(CONST.FS_ENCRYPTION_KEY_SIZE / 2).fill('0').join('');

    it('should save and load content from file', async () => {
      await AppData.putEncryptedFile(testFile, hexKey, testContent);
      await Promise.resolve();
      const actual = await AppData.getEncryptedFile(testFile, hexKey);
      expect(actual).toBe(testContent);
    });
  });

  describe('buildAppDataPath', () => {
    beforeEach(() => {
      jest.mocked(app.getPath).mockReturnValue('test-app-data');
    });

    it.each([
      ['test-file.json', join('test-app-data', 'wcd-test-file.json')],
      ['./test-file.json', join('test-app-data', 'wcd-test-file.json')],
      ['test-folder/test-file.json', join('test-app-data', 'wcd-test-file.json')],
      ['test-folder/../test-file.json', join('test-app-data', 'wcd-test-file.json')],
    ])('sould resolve %s', (input, expected) => {
      expect(AppData.buildAppDataPath(input)).toEqual(expected);
    });
  });
});
