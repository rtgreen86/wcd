import { Command } from '@shared/types';
import FileSystem from '@main/services/FileSystem';
import Model from '../Model';

export default class Export implements Command<Promise<void>> {
  readonly model;

  constructor(model: Model) {
    this.model = model;
  }

  async execute() {
    if (!this.model || !this.model.fsKey) {
      throw new Error('Export Error: There is no encryption key in the model.');
    }
    if (!this.model || !this.model.data) {
      throw new Error('Export Error: The model does not contain data.')
    }
    const exportPath = FileSystem.buildExportPath('Calendar.json');
    FileSystem.putTextFile(exportPath, this.model.data);
  }
}
