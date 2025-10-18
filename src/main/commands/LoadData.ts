import Model from '@main/models/Model';
import { Command } from '@shared/types';
import DataStorage from '@main/services/DataStorage';

export default class LoadData implements Command<Promise<void>> {
  constructor(private params: {
    model: Model,
  }) { }

  async execute() {
    this.params.model.data = await DataStorage.get();
  }
}
