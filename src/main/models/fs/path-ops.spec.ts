import { app } from 'electron';
import { join } from 'node:path';
import { getUserFilePath } from './path-ops';

describe('path-ops', () => {
  it.each([
    ['test-file.json', 'wc-test-file.json'],
    ['./test-file.json', 'wc-test-file.json'],
    ['../test-file.json', 'wc-test-file.json'],
    ['/test-file.json', 'wc-test-file.json'],
    ['subfolder/test-file.json', 'wc-test-file.json'],
  ])('should build path to %s', (filename, expected) => {
    expect(getUserFilePath(filename)).toEqual(join(app.getPath('userData'), expected));
  });
});
