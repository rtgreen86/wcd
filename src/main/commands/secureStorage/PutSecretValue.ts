import keytar from 'keytar';
import { Command } from '@shared/types';
import * as CONST from '@main/CONST';

export default class PutSecretValue implements Command<Promise<void>> {
  constructor(private params: {
    key: string,
    value: string
  }) { }

  async execute() {
    await keytar.setPassword(CONST.SECURE_STORAGE_SERVICE, this.params.key, this.params.value);
  }
}
