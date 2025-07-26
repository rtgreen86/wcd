import { Command } from '@shared/types';
import { buildAbsolutePath } from '@main/utils/appData';
import PutFileContent from './PutFileContent';

export default class PutAppDataContent implements Command<Promise<void>> {
  constructor(private params: {
    filename: string,
    content: string,
  }) {}

  async execute() {
    return new PutFileContent({
      filename: buildAbsolutePath(this.params.filename),
      content: this.params.content,
    }).execute();
  }
}
