import { Command } from '@shared/types';
import { buildAbsolutePath } from '@main/utils/appData';
import GetFileContent from './GetFileContent';

export default class GetAppDataContent implements Command<Promise<string>> {
  constructor(private params: {
    filename: string,
  }) {}

  execute() {
    return new GetFileContent({
      filename: buildAbsolutePath(this.params.filename),
    }).execute();
  }
}
