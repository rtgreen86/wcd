import {Record} from './Record';

export default class Storage<Type> {
  readonly version = 1;

  private records: Record<Type>[] = [];

  put(record: Record<Type>) {

  }

  getAll() {
    return this.records;
  }
}