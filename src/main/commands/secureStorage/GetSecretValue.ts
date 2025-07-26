import keytar from 'keytar';
import { Command } from '@main/types';
import * as CONST from '@main/CONST';

export default class GetSecretValue implements Command<Promise<string>> {
  constructor(private params: {
    key: string,
  }) { }

  execute() {
    return keytar.getPassword(CONST.SECURE_STORAGE_SERVICE, this.params.key);
  }
}
