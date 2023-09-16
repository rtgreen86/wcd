import { app } from 'electron';
import { join } from 'node:path';
import FileFactory from './FileFactory';
import {KeyGenerator} from '../../crypt-tools';

const { getPath } = app;

describe('EncryptedFile', () => {
  const content = 'Hello World! Some saved clear text data.';
  const fileName = 'test-file.dat';

  let hexKey: string;

  beforeAll(async () => {
    hexKey = await KeyGenerator.generateHex();
  });

  let pathToFile: string;

  beforeEach(() => {
    pathToFile = join(getPath('userData'), fileName);
  });


  it('should contain path to file', () => {
    const file = FileFactory.createEncryptedFile(pathToFile, hexKey);
    expect(file.path).toEqual(pathToFile);
  });

  describe('save file', () => {
    beforeEach(async () => {
      const file = FileFactory.createEncryptedFile(pathToFile, hexKey);
      await file.setContent(content).save();
    });

    describe('load file', () => {
      it('should load content', async () => {
        const file = await FileFactory.loadEncryptedFile(pathToFile, hexKey);
        expect(file.content).toEqual(content);
      });
    });
  });
});
