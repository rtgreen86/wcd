export default interface File {
  content: string,

  get path(): string;

  save(): Promise<void>;
}
