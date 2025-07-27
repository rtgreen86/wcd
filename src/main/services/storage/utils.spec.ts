import { jest } from '@jest/globals';
import { join } from 'node:path';
import { buildAbsolutePath } from './utils';

jest.mock('electron');

import { app } from 'electron';

describe('utils', () => {
  describe('buildAbsolutePath', () => {
    beforeEach(() => {
      jest.mocked(app.getPath).mockReturnValue('test-app-data');
    });

    it.each([
      ['test-file.json', join('test-app-data', 'wcd-test-file.json')],
      ['./test-file.json', join('test-app-data', 'wcd-test-file.json')],
      ['test-folder/test-file.json', join('test-app-data', 'wcd-test-file.json')],
      ['test-folder/../test-file.json', join('test-app-data', 'wcd-test-file.json')],
    ])('sould resolve %s', (input, expected) => {
      expect(buildAbsolutePath(input)).toEqual(expected);
    });
  });
});