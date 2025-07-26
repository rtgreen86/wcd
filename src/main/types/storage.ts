export interface Storage {
  save(content: string): Promise<void>;
  load(): Promise<string>
}
