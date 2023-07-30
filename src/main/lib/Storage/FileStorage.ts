import {Record} from './Record';
// import PersistentStorage from './PersistentStorage';

export default class FileStorage<Type extends Record> /*implements PersistentStorage<Type>*/ {
  get() {
    return Promise.resolve({
      items: []
    });
  }

  put() {
    return Promise.resolve();
  }
}