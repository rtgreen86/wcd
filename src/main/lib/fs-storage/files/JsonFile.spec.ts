import { app } from 'electron';
import { join } from 'node:path';
import FileFactory from './FileFactory';

const { getPath } = app;

describe('JsonFile', () => {
  const content = {
    name: 'Taras Shevchenko',
    age: 100,
    active: true,
  };

  const pathToFile = (fileName: string) => join(getPath('userData'), fileName);

  it('should contain path to file', () => {
    const jsonFile = FileFactory.createJsonFile(pathToFile('test-file.json'));
    expect(jsonFile.path).toEqual(pathToFile('test-file.json'));
  });

  describe('save file', () => {
    beforeEach(async () => {
      const jsonFile = FileFactory.createJsonFile(pathToFile('test-file.json'));
      await jsonFile.setContent(content).save();
    });

    describe('load file', () => {
      it('should load content', async () => {
        const jsonFile = await FileFactory.loadJsonFile(pathToFile('test-file.json'));
        expect(jsonFile.content).toEqual(content);
      });
    });
  });
});
