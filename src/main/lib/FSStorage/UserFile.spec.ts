import { app } from 'electron';
import { join } from 'node:path';
import UserFile from './UserFile';

describe('UserFile', () => {
  describe('path', () => {
    let userData: string;

    beforeAll(() => {
      userData = app.getPath('userData');
    });

    it.each([
      ['test-file.json', 'test-file.json'],
      ['./test-file.json', 'test-file.json'],
      ['../test-file.json', 'test-file.json'],
      ['/test-file.json', 'test-file.json'],
      ['subfolder/test-file.json', 'test-file.json'],
    ])('should build path to Application Data folder for %s', (filename, expected) => {
      const file = UserFile.create(filename);
      expect(file.path).toEqual(join(userData, expected));
    });
  });
});