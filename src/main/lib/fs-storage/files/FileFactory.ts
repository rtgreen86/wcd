import BinFile from './BinFile';
import JsonFile from './JsonFile';
import TextFile from './TextFile';
import EncryptedFile from './EncryptedFile';

export default class FileFactory {
  static createBinFile(path: string) {
    return new BinFile(path);
  }

  static createEncryptedFile(path: string, hexKey: string) {
    return new EncryptedFile(path, hexKey);
  }

  static createEncryptedJsonFile<Type>(path: string) {
    const encryptedFile = FileFactory.createEncryptedFile(path);
    return new JsonFile<Type>(encryptedFile);
  }

  static createTextFile(path: string) {
    return new TextFile(path);
  }

  static createJsonFile<Type>(path: string) {
    return new JsonFile<Type>(FileFactory.createTextFile(path));
  }

  static loadBinFile(path: string) {
    return BinFile.load(path);
  }

  static async loadEncryptedFile(path: string, hexKey: string) {
    return await EncryptedFile.load(path, hexKey);
  }

  static loadEncryptedJsonFile(path: string) {

  }

  static loadTextFile(path: string) {
    return TextFile.load(path);
  }

  static async loadJsonFile<Type>(path: string) {
    return JsonFile.load<Type>(await FileFactory.loadTextFile(path));
  }
}
