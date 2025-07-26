import { Model } from '@main/models';
import LoadData from '@main/commands/data/LoadData';
import DataStorage from '@main/services/data/DataStorage';

export default class Application {
  static async initializeModel() {
    const model = new Model();
    await DataStorage.initializeFSKey();
    await new LoadData({ model }).execute();
    return model;
  }
}
