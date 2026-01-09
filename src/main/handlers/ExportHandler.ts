import { BaseHandler } from '@shared/infrastructure';
import Export from '@main/models/commands/Export';
import Model from '@main/models/Model';

export default class ExportHandler extends BaseHandler<WCD.Request, Promise<void>> {
  private readonly model;

  constructor(model: Model) {
    super();
    this.model = model;
  }

  async execute(request?: WCD.Request): Promise<void> {
    if (request.type !== 'export') return this.executeNext();
    const command = new Export(this.model);
    await command.execute();
  }
}
