import { randomBytes } from 'node:crypto';
import { Command } from '@shared/types';
import * as CONST from '@main/CONST';

export default class GenerateKey implements Command<string> {
  execute() {
    const buffer = randomBytes(CONST.FS_ENCRYPTION_KEY_SIZE);
    return buffer.toString('hex');
  }
}
