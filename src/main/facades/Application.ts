import Model from '@main/models/Model';
import LoadData from '@main/commands/LoadData';
import DataStorage from '@main/services/storage/DataStorage';

export default class Application {
  static async initializeModel() {
    const model = new Model();
    await DataStorage.initializeFSKey();
    await new LoadData({ model }).execute();
    return model;
  }
}
