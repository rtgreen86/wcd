import { BaseHandler } from '@shared/infrastructure';
import Export from '@main/models/commands/Export';
import Import from '@main/models/commands/Import';
import Model from '@main/models/Model';

export default class ExportHandler extends BaseHandler<WCD.Request, Promise<void>> {
  private readonly model;

  constructor(model: Model) {
    super();
    this.model = model;
  }

  async execute(request?: WCD.Request): Promise<void> {
    if (request.type === 'import') return await new Import(this.model).execute();
    if (request.type === 'export') return await new Export(this.model).execute();
    return this.executeNext();
  }
}
