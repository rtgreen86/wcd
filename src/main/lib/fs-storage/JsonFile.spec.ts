import { app } from 'electron';
import { join } from 'node:path';
import JsonFile from './JsonFile';
import TextFile from './TextFile';

const { getPath } = app;

describe('JsonFile', () => {
  const content = {
    name: 'Taras Shevchenko',
    age: 100,
    active: true,
  };

  const pathToFile = (fileName: string) => join(getPath('userData'), fileName);

  it('should contain path to file', () => {
    const textFile = new TextFile(pathToFile('test-file.json'));
    const jsonFile = new JsonFile(textFile);
    expect(jsonFile.path).toEqual(pathToFile('test-file.json'));
  });

  describe('save file', () => {
    beforeEach(async () => {
      const textFile = new TextFile(pathToFile('test-file.json'));
      const jsonFile = new JsonFile(textFile);
      await jsonFile.setContent(content).save();
    });

    describe('load file', () => {
      it('should load content', async () => {
        const textFile = await TextFile.load(pathToFile('test-file.json'));
        const jsonFile = JsonFile.load(textFile);
        expect(jsonFile.content).toEqual(content);
      });
    });
  });
});
