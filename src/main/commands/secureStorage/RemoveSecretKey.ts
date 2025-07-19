import keytar from 'keytar';
import { Command } from '@shared/types';
import * as CONST from '@main/CONST';

export default class RemoveSecretKey implements Command<Promise<void>> {
  constructor(private params: {
    key: string
  }) { }

  async execute() {
    await keytar.deletePassword(CONST.SECURE_STORAGE_SERVICE, this.params.key);
  }
}
