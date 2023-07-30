import { app } from 'electron';
import { join } from 'node:path';
import { getFilePath } from './FilePath';


describe('FilePath', () => {
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
    expect(getFilePath(filename)).toContain(join(userData, expected));
  });
});
