import { app } from 'electron';
import { jest } from '@jest/globals';
import { mkdtemp, rm } from 'node:fs/promises';
import * as CONST from '@main/CONST';
import os from 'node:os';
import path, { join } from 'node:path';
import FileSystem from './FileSystem';

jest.mock('electron');

describe('FileSystem', () => {
  const testContent = 'Hello, world!';
  const textFile = 'text-file.txt';
  const encryptedFile = 'encrypted-file.enc';
  const hexKey = new Array(CONST.FS_ENCRYPTION_KEY_SIZE / 2).fill('0').join('');

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

  it('should save and load text files', async () => {
    const file = path.join(tempDir, textFile);
    await FileSystem.putTextFile(file, testContent);
    const actual = await FileSystem.getTextFile(file);
    expect(actual).toBe(testContent);
  });

  it('should save and load encrypted content', async () => {
    const file = path.join(tempDir, encryptedFile);
    await FileSystem.putEncryptedFile(file, hexKey, testContent);
    const actual = await FileSystem.getEncryptedFile(file, hexKey);
    expect(actual).toBe(testContent);
  });

  describe('AppData', () => {
    it('should save and load test content from file', async () => {
      const testFile = 'test.json';
      await FileSystem.putAppDataTextFile(testFile, testContent);
      const actual = await FileSystem.getAppDataTextFile(testFile);
      expect(actual).toBe(testContent);
    });

    describe('encrypted', () => {
      const testFile = 'test.json.enc';
      const hexKey = new Array(CONST.FS_ENCRYPTION_KEY_SIZE / 2).fill('0').join('');

      it('should save and load content from file', async () => {
        await FileSystem.putAppDataEncryptedFile(testFile, hexKey, testContent);
        await Promise.resolve();
        const actual = await FileSystem.getAppDataEncryptedFile(testFile, hexKey);
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
        expect(FileSystem.buildAppDataPath(input)).toEqual(expected);
      });
    });
  });
});
