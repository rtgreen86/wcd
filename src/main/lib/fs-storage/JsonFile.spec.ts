import { app } from 'electron';
import { join } from 'node:path';
import JsonFile from './JsonFile';

const { getPath } = app;

describe('JsonFile', () => {
  const content = {
    name: 'Taras Shevchenko',
    age: 100,
    active: true,
  };

  const pathToFile = (fileName: string) => join(getPath('userData'), fileName);

  it('should contain path to file', () => {
    const file = new JsonFile(pathToFile('test-file.json'));
    expect(file.path).toEqual(pathToFile('test-file.json'));
  });

  describe('save file', () => {
    beforeEach(async () => {
      const file = new JsonFile(pathToFile('test-file.json'));
      await file.setContent(content).save();
    });

    describe('load file', () => {
      it('should load content', async () => {
        const file = await JsonFile.load(pathToFile('test-file.json'));
        expect(file.content).toEqual(content);
      });
    });
  });
});
