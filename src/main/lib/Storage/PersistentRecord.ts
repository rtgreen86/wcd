import {Record} from './Record';

export type PersistRecord<Type extends Record> = {
  items: Type[]
};
