import File from './File';

export default abstract class AbstractFile implements File {
  content: string;

  abstract get path(): string;

  abstract save(): Promise<void>;
}
