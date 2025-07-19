import { Command } from '@shared/types';
import { buildAbsolutePath } from '@main/utils/appData';
import GetFileEncryptedContent from './GetFileEncryptedContent';

export default class GetAppDataEncryptedContent implements Command<Promise<string>> {
  constructor(private params: {
    filename: string,
    hexKey: string,
  }) {}

  execute() {
    return new GetFileEncryptedContent({
      filename: buildAbsolutePath(this.params.filename),
      hexKey: this.params.hexKey,
    }).execute();
  }
}
