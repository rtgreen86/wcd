import crypto from 'node:crypto';
import * as CONST from '@main/CONST';

export default class TokenGenerator {
  static async generate() {
    return crypto.randomBytes(CONST.TOKEN_LENGTH).toString('hex');
  }
}
