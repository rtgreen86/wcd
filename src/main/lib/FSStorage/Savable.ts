export default interface Savable {
  readonly path: string;

  save(): Promise<void>;
}
