import { Command } from '@shared/types';
import { buildAbsolutePath } from '@main/utils/appData';
import PutFileEncryptedContent from './PutFileEncryptedContent';

export default class PutAppDataEncryptedContent implements Command<Promise<void>> {
  constructor(private params: {
    filename: string,
    hexKey: string,
    content: string,
  }) {}

  async execute() {
    return new PutFileEncryptedContent({
      filename: buildAbsolutePath(this.params.filename),
      hexKey: this.params.hexKey,
      content: this.params.content,
    }).execute();
  }
}
