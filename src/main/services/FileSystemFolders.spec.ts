import { app } from 'electron';
import { jest } from '@jest/globals';
import { join } from 'node:path';
import { buildAppDataPath } from './FileSystemFolders';

jest.mock('electron');

describe('FileystemFolders', () => {
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
      expect(buildAppDataPath(input)).toEqual(expected);
    });
  });
});
