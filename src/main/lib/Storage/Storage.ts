type Key = {
  id: number,
}

type Record = Partial<Key> & {
  [key: string]: unknown,
};

export default class Storage<Type extends Record> {
  readonly version = 1;

  private data: Type[] = [];

  put(item: Type) {
    if (!item.id && item.id !== 0 || item.id < 0) {
      item.id = this.data.length;
    }
    this.data[item.id] = item;
    return Promise.resolve(item);
  }

  getAll() {
    return Promise.resolve(this.data);
  }

  getById(key: Key) {
    return Promise.resolve(this.data[key.id]);
  }
}