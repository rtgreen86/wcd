import { app } from 'electron';
import { join } from 'node:path';
import FileFactory from './FileFactory';

const { getPath } = app;

describe('EncryptedFile', () => {
  const content = 'Hello World! Some saved clear text data.';
  const fileName = 'test-file.dat';

  let pathToFile: string;

  beforeEach(() => {
    pathToFile = join(getPath('userData'), fileName);
  });

  it('should contain path to file', () => {
    const file = FileFactory.createEncryptedFile(pathToFile);
    expect(file.path).toEqual(pathToFile);
  });

  describe('save file', () => {
    beforeEach(async () => {
      const file = FileFactory.createEncryptedFile(pathToFile);
      await file.setContent(content).save();
    });

    describe('load file', () => {
      it('should load content', async () => {
        const file = await FileFactory.loadEncryptedFile(pathToFile);
        expect(file.content).toEqual(content);
      });
    });
  });
});
