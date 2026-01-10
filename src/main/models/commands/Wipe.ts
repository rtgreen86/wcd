import { Command } from '@shared/infrastructure';
import FileSystem from '../../services/FileSystem';
import Model from '../Model';
import DataStorage from '../../services/DataStorage';

export default class Wipe implements Command<Promise<void>> {
  readonly model;

  constructor(model: Model) {
    this.model = model;
  }

  async execute() {
    if (!this.model || !this.model.fsKey) {
      throw new Error('Wipe Error: There is no encryption key in the model.');
    }
    this.model.data = '[]';
    await new DataStorage(this.model.fsKey).put('[]'); // TODO: add debaunce
  }
}
