import { app } from 'electron';
import { join } from 'node:path';

import File from './File';
import Directory from './Directory';
import UserData from './UserData';
import { FileType } from './FileType';

const { getPath } = app;

describe('UserData', () => {
  const getExpectedPath = (filename: string) => join(getPath('userData'), filename);

  let dir: Directory;

  beforeEach(() => {
    dir = new UserData();
  });

  describe('file path', () => {
    it.each([
      ['test-file.json', 'wc-test-file.json'],
      ['./test-file.json', 'wc-test-file.json'],
      ['../test-file.json', 'wc-test-file.json'],
      ['/test-file.json', 'wc-test-file.json'],
      ['subfolder/test-file.json', 'wc-test-file.json'],
    ])('should be to Application Data folder for %s', (filename, expected) => {
      const file = dir.create(filename, FileType.TEXT);
      expect(file.path).toEqual(getExpectedPath(expected));
    });
  });

  describe('JSON file', () => {
    const content = {
      name: 'Taras Shevchenko',
      age: 100,
      active: true,
    };

    beforeEach(async () => {
      const file = dir.create('test-file.json', FileType.JOSN);
      file.content = content;
      await file.save();
    });

    describe('load', () => {
      it('should load content', async () => {
        await expect(dir.load('test-file.json', FileType.JOSN)).resolves.toEqual(expect.objectContaining({content}));
      });
    });
  });
});
