import { buildAbsolutePath } from './utils';
import FileSystem from './FileSystem';
import EncryptedFileSystem from './EncryptedFileSystem';

export default class AppData {
  static get(key: string) {
    return FileSystem.get(buildAbsolutePath(key));
  }

  static put(key: string, content: string) {
    return FileSystem.put(buildAbsolutePath(key), content);
  }

  static getEncrypted(key: string, hexKey: string) {
    return EncryptedFileSystem.get(buildAbsolutePath(key), hexKey);
  }

  static putEncrypted(key: string, hexKey: string, content: string) {
    return EncryptedFileSystem.put(buildAbsolutePath(key), hexKey, content);
  }
}
