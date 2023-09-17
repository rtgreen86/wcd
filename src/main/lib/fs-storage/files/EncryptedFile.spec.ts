import { app } from 'electron';
import { join } from 'node:path';
import FileFactory from './FileFactory';
import { KeyGenerator } from '../../crypt-tools';

const { getPath } = app;

describe('EncryptedFile', () => {
  const content = 'Hello World! Some saved clear text data.';
  const fileName = 'test-file.dat';

  let hexKey1: string;
  let hexKey2: string;

  beforeAll(async () => {
    hexKey1 = await KeyGenerator.generateHex();
    hexKey2 = await KeyGenerator.generateHex();
  });

  let pathToFile: string;

  beforeEach(() => {
    pathToFile = join(getPath('userData'), fileName);
  });


  it('should contain path to file', () => {
    const file = FileFactory.createEncryptedFile(pathToFile, hexKey1);
    expect(file.path).toEqual(pathToFile);
  });

  describe('save file', () => {
    beforeEach(async () => {
      const file = FileFactory.createEncryptedFile(pathToFile, hexKey1);
      await file.setContent(content).save();
    });

    describe('load file', () => {
      it('should load content', async () => {
        const file = await FileFactory.loadEncryptedFile(pathToFile, hexKey1);
        expect(file.content).toEqual(content);
      });

      describe('on incorrect password', () => {
        it('should throw an exception', async () => {
          await expect(FileFactory.loadEncryptedFile(pathToFile, hexKey2))
            .rejects.toEqual(expect.objectContaining({
              code: 'ERR_OSSL_BAD_DECRYPT',
              reason: 'bad decrypt',
            }));
        });
      });
    });
  });
});
