import { Command } from '@shared/types';
import Model from '@main/models/Model';
import TokenGenerator from '@main/services/TokenGenerator';
import VerifyPIN from './VerifyPIN';

export default class Authenticate implements Command<Promise<string | null>> {
  constructor(private params: {
    model: Model,
    pin: string | null,
  }) { }

  async execute() {
    if (!await new VerifyPIN({ pin: this.params.pin }).execute()) return null;
    const token = await TokenGenerator.generate();
    this.params.model.sessionTokens.add(token);
    return token;
  }
}
