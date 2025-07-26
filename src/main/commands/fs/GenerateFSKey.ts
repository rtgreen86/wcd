import { randomBytes } from 'node:crypto';
import { Command } from '@main/types';
import * as CONST from '@main/CONST';

export default class GenerateKey implements Command<string> {
  execute() {
    const buffer = randomBytes(CONST.FS_ENCRYPTION_KEY_SIZE);
    return buffer.toString('hex');
  }
}
