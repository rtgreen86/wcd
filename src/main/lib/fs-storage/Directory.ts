import { FileType } from './FileType';
import File from './File';

export default interface Directory {
  create(filename: string, type: FileType.TEXT): File<string>;
  create<Type>(filename: string, type: FileType.JOSN): File<Type>
  create(filename: string, type: FileType): File<unknown>;

  load(filename: string, type: FileType.TEXT): Promise<File<string>>;
  load<Type>(filename: string, type: FileType.JOSN): Promise<File<Type>>
  load(filename: string, type: FileType): Promise<File<unknown>>;
}
