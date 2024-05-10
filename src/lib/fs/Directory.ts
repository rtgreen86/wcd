import { File } from './File';

export interface Directory {
  getEncryptedFile(filename: string, hexKey: string): File<string>;
};
