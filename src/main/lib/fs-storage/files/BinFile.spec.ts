import { app } from 'electron';
import { join } from 'node:path';
import { Buffer } from 'node:buffer';
import FileFactory from './FileFactory';

const { getPath } = app;

describe('BinFile', () => {
  const content = Buffer.alloc(1, 'a');
  const fileName = 'test-file.txt';

  let pathToFile: string;

  beforeEach(() => {
    pathToFile = join(getPath('userData'), fileName);
  });

  it('should contain path to file', () => {
    const file = FileFactory.createBinFile(pathToFile);
    expect(file.path).toEqual(pathToFile);
  });

  describe('save file', () => {
    beforeEach(async () => {
      const file = FileFactory.createBinFile(pathToFile);
      await file.setContent(content).save();
    });

    describe('load file', () => {
      it('should load content', async () => {
        const file = await FileFactory.loadBinFile(pathToFile);
        expect(file.content).toEqual(content);
      });
    });
  });
});
