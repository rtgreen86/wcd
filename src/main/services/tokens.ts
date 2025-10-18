import crypto from 'node:crypto';
import * as CONST from '@main/CONST';

export async function generateToken() {
  return crypto.randomBytes(CONST.TOKEN_LENGTH).toString('hex');
}
