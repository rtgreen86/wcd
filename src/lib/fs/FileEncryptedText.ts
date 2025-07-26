import { File } from './File';
import GetFileEncryptedContent from '../../main/commands/fs/GetFileEncryptedContent';
import PutFileEncryptedContent from '../../main/commands/fs/PutFileEncryptedContent';

export class FileEncryptedText implements File<string> {
  readonly path: string;

  private readonly hexKey: string;

  constructor(path: string, hexKey: string) {
    this.path = path;
    this.hexKey = hexKey;
  }

  async read() {
    return new GetFileEncryptedContent({
      filename: this.path,
      hexKey: this.hexKey
    }).execute();
  }

  async write(content: string) {
    await new PutFileEncryptedContent({
      filename: this.path,
      hexKey: this.hexKey,
      content: content
    }).execute();
  }
}
