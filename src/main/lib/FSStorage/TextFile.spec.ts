import { app } from 'electron';
import { join } from 'node:path';
import TextFile from './TextFile';

const { getPath } = app;

describe('TextFile', () => {
  const content = 'Hello World!';
  const fileName = 'test-file.txt';

  let pathToFile: string;

  beforeEach(() => {
    pathToFile = join(getPath('userData'), fileName);
  });

  it('should contain path to file', () => {
    const file = TextFile.create(pathToFile);
    expect(file.path).toEqual(pathToFile);
  });

  describe('save file', () => {
    beforeEach(async () => {
      const file = TextFile.create(pathToFile);
      await file.setContent(content).save();
    });

    describe('load file', () => {
      it('should load content', async () => {
        const file = await TextFile.load(pathToFile);
        expect(file.content).toEqual(content);
      });
    });
  });
});
