import {Record} from './Record';

export type PersistRecord<Type extends Record> = {
  items: Type[]
};

export default interface PersistentStorage<Type extends Record> {
  get(): Promise<PersistRecord<Type>>

  put(record: PersistRecord<Type>): Promise<void>
}
