import { Model } from '@main/models';
import { Command } from '@shared/types';
import DataStorage from '@main/services/data/DataStorage';

export default class PutData implements Command<Promise<void>> {
  constructor(private params: {
    model: Model,
    data: string,
  }) { }

  async execute() {
    const { model, data } = this.params;
    model.data = data;
    await DataStorage.put(data);
  }
}
