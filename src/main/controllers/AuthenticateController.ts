import { BaseHandler } from '../../lib/chain-of-responsibility';
import { Model } from "../models";
import RemovePIN from '@main/commands/security/RemovePIN';
import SetPIN from '@main/commands/security/SetPIN';
import VerifyPIN from '@main/commands/security/VerifyPIN';
import Authenticate from '@main/commands/security/Authenticate';

export default class AuthenticateController extends BaseHandler<WCD.Request, Promise<WCD.Response>> {
  private readonly model;

  constructor(model: Model) {
    super();
    this.model = model;
  }

  async handle(request: WCD.Request): Promise<WCD.Response> {
    if (request.type === 'get:isPinExists') {
      return ! (await new VerifyPIN({ pin: null }).execute());
    }

    if (request.type === 'set:pin') {
      const pin = request.payload.pin === '' ? null : request.payload.pin;
      return new SetPIN({ pin, newPin: request.payload.newPin }).execute();
    }

    if (request.type === 'remove:pin') {
      const pin = request.payload.pin === '' ? null : request.payload.pin;
      return new RemovePIN({ pin }).execute();
    }

    if (request.type === 'get:token') {
      const pin = request.payload.pin === '' ? null : request.payload.pin;
      return new Authenticate({ model: this.model, pin}).execute();
    }

    return super.handle(request);
  }
}
