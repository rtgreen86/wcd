import { BaseHandler } from '../../lib/chain-of-responsibility';
import DataStorage from '@main/services/storage/DataStorage';
import Model from '@main/models/Model';
import PutData from '@main/commands/data/PutData';

export default class PutDataController extends BaseHandler<WCD.Request, Promise<WCD.Response>> {
  constructor(private params: {
    model: Model,
  }) {
    super();
  }

  async handle(request: WCD.Request): Promise<WCD.Response> {
    if (request.type !== 'put:data') {
      return super.handle(request);
    }
    const data = request.payload.content || '';
    await new PutData({
      model: this.params.model,
      data,
    }).execute();
  }
}
