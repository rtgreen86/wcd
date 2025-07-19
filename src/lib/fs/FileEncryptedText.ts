import { File } from './File';
import EncryptedFileSystem from '../../main/storage/EncryptedFileSystem';

export class FileEncryptedText implements File<string> {
  readonly path: string;

  private readonly hexKey: string;

  constructor(path: string, hexKey: string) {
    this.path = path;
    this.hexKey = hexKey;
  }

  async read() {
    return new EncryptedFileSystem(this.path, this.hexKey).load();
  }

  async write(content: string) {
    await new EncryptedFileSystem(this.path, this.hexKey).save(content);
  }
}
