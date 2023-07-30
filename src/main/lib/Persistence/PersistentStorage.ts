import {PersistentData} from './PersistentData';

export default interface PersistentStorage<Type> {
  get(): Promise<PersistentData<Type>>

  put(record: Type[]): Promise<void>
}
