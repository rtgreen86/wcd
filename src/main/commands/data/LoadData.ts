import { Model } from '@main/models';
import { Command } from '@shared/types';
import DataStorage from '@main/services/data/DataStorage';

export default class LoadData implements Command<Promise<void>> {
  constructor(private params: {
    model: Model,
  }) { }

  async execute() {
    this.params.model.data = await DataStorage.get();
  }
}
