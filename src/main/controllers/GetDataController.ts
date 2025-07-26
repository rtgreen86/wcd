import { BaseHandler } from '../../lib/chain-of-responsibility';
import { Model } from '@main/models';

export default class GetDataController extends BaseHandler<WCD.Request, Promise<WCD.Response>> {
  constructor(private params: {
    model: Model,
  }) {
    super();
  }

  async handle(request: WCD.Request): Promise<WCD.Response> {
    if (request.type !== 'get:data') {
      return super.handle(request);
    }
    const name = request.payload;
    const content = this.params.model.data;
    return { name, content };
  }
}
