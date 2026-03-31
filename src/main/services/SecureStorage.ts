import { Buffer } from 'node:buffer';
import { safeStorage } from 'electron';
import * as CONST from '../Const';
import * as AppData from './ApplicationData';
import * as Messages from '../Messages';

export enum Key {
  PIN = 'pin',
  CryptoKey = 'crypto-key',
};

// TODO: Implement Unsupported OS case

export async function getSecret(key: Key): Promise<string> {
  const encr = await getEncryptedContent(key);
  if (!encr) return null;
  return safeStorage.decryptString(encr);
}

export async function putSecret(key: Key, value: string) {
  const encr = safeStorage.encryptString(value);
  await AppData.putBinnaryFile(key, encr);
}

export async function removeSecret(key: Key) {
  const filename = getFilename(key);
  await AppData.removeFile(filename);
}

function getFilename(key: Key) {
  switch (key) {
    case Key.PIN: return CONST.PIN_ENCRYPTED_FILENAME;
    case Key.CryptoKey: return CONST.MASTERKEY_ENCRYPTED_FILENAME;
    default: throw new Error(Messages.ERROR_UNSUPPORTED_SECRET_KEY, {cause: key});
  }
}

async function getEncryptedContent(key: Key) {
  const filename = getFilename(key);
  if (!await AppData.canRead(filename)) return null;
  return AppData.getBinnaryFile(filename);
}

async function putEncryptedContent(key: Key, value: Buffer) {
  const filename = getFilename(key);
  await AppData.putBinnaryFile(filename, value);
}
