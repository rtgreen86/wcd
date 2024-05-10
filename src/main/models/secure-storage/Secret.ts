export type Key = 'pin' | 'key';

export interface Secret {
  get(key: string): Promise<string | null>;
  put(key: string, secret: string): Promise<void>;
  remove(key: string): Promise<boolean>;
};
