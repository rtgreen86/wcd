import { Command } from '@shared/infrastructure';
import FileSystem from '../../services/FileSystem';
import Model from '../Model';
import DataStorage from '../../services/DataStorage';

export default class Import implements Command<Promise<void>> {
  readonly model;

  constructor(model: Model) {
    this.model = model;
  }

  async execute() {
    if (!this.model || !this.model.fsKey) {
      throw new Error('Import Error: There is no encryption key in the model.');
    }
    const importPath = FileSystem.buildExportPath('Calendar.json');
    const data = await FileSystem.getTextFile(importPath);
    this.model.data = data;
    await new DataStorage(this.model.fsKey).put(data); // TODO: add debaunce
  }
}
