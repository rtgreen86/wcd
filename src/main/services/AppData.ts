import { Buffer } from 'node:buffer';
import { buildAppDataPath } from './FileSystemFolders';
import * as FileSystem from './FileSystem'
import * as FileSystemCrypto from './FileSystemCrypto';

export const canRead = (filename: string) => FileSystem.canRead(
  buildAppDataPath(filename));

export const canWrite = (filename: string) => FileSystem.canWrite(
  buildAppDataPath(filename));

export const getBinnaryFile = (filename: string) => FileSystem.getBinnaryFile(
  buildAppDataPath(filename));

export const getEncryptedFile = (filename: string, hexKey: string) => FileSystemCrypto.getEncryptedFile(
  buildAppDataPath(filename), hexKey);

export const getTextFile = (filename: string) => FileSystem.getTextFile(
  buildAppDataPath(filename));

export const putBinnaryFile = (filename: string, content: Buffer) => FileSystem.putBinnaryFile(
  buildAppDataPath(filename), content);

export const putEncryptedFile = (filename: string, hexKey: string, content: string) => FileSystemCrypto.putEncryptedFile(
  buildAppDataPath(filename), hexKey, content);

export const putTextFile = (filename: string, content: string) => FileSystem.putTextFile(
  buildAppDataPath(filename), content);

export const removeFile = (filename: string) => FileSystem.removeFile(
  buildAppDataPath(filename));
