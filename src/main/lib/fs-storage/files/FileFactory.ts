import BinFile from './BinFile';
import JsonFile from './JsonFile';
import TextFile from './TextFile';

export default class FileFactory {
  static createBinFile(path: string) {
    return new BinFile(path);
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

  static loadTextFile(path: string) {
    return TextFile.load(path);
  }

  static async loadJsonFile<Type>(path: string) {
    return JsonFile.load<Type>(await FileFactory.loadTextFile(path));
  }
}
