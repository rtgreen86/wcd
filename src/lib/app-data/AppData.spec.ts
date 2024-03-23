import { jest } from '@jest/globals';
import { AppData } from './index';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

jest.mock('electron');

import { app } from 'electron';

describe('AppData', () => {
  beforeEach(() => {
    jest.mocked(app.getPath).mockReturnValue(tmpdir());
  });

  it.each([
    ['test-file.json', join(tmpdir(), 'test-file.json')],
    ['./test-file.json', join(tmpdir(), 'test-file.json')],
    ['test-folder/test-file.json', join(tmpdir(), 'test-folder', 'test-file.json')],
    ['test-folder/../test-file.json', join(tmpdir(), 'test-file.json')],
  ])('sould resolve %s', (input, expected) => {
    expect(AppData.getFile(input)).toEqual(expect.objectContaining({ path: expected }));
  });

  it.each([
    ['../test-file.json'],
    ['../another-folder/test-file.json'],
  ])('sould throw error for %s', (input) => {
    expect(() => AppData.getFile(input)).toThrow('Invalid filename');
  });
});