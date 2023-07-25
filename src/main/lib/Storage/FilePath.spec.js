import { app } from 'electron';
import { join } from 'node:path';
import { getFilePath } from './FilePath';


describe('FilePath', () => {
  const applictionFolder = 'test-app-data';

  beforeAll(() => {
    app.getPath.mockReturnValue(applictionFolder);
  });

  it.each([
    ['test-file.json', join(applictionFolder, 'test-file.json')],
    ['./test-file.json', join(applictionFolder, 'test-file.json')],
    ['../test-file.json', join(applictionFolder, 'test-file.json')],
    ['/test-file.json', join(applictionFolder, 'test-file.json')],
    ['subfolder/test-file.json', join(applictionFolder, 'test-file.json')],
  ])('should build path to Application Data folder for %s', (filename, expected) => {
    expect(getFilePath(filename)).toContain(expected);
  });
});
