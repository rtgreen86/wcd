import keytar from 'keytar';
import { Command } from '@shared/types';
import * as CONST from '@main/CONST';

export default class GetValue implements Command<Promise<string>> {
  constructor(private params: {
    key: string,
  }) { }

  execute() {
    return keytar.getPassword(CONST.SECURE_STORAGE_SERVICE, this.params.key);
  }
}
