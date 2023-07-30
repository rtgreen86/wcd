import { app } from 'electron';
import { join } from 'node:path';
import { getFilePath } from './FilePath';


describe('FilePath', () => {
  let appData: string;

  beforeAll(() => {
    appData = app.getPath('appData');
  });

  it.each([
    ['test-file.json', 'test-file.json'],
    ['./test-file.json', 'test-file.json'],
    ['../test-file.json', 'test-file.json'],
    ['/test-file.json', 'test-file.json'],
    ['subfolder/test-file.json', 'test-file.json'],
  ])('should build path to Application Data folder for %s', (filename, expected) => {
    expect(getFilePath(filename)).toContain(join(appData, expected));
  });
});
