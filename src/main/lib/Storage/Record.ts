export type Key = {
  id: number,
}

export type Record = Partial<Key> & {
  [key: string]: unknown,
};