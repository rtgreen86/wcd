import { Command } from '@shared/types';
import Model from '@main/models/Model';
import TokenGenerator from '@main/services/TokenGenerator';
import PinGuard from '@main/services/PinGuard';

export default class Authenticate implements Command<Promise<string | null>> {
  constructor(private params: {
    model: Model,
    pin: string | null,
  }) { }

  async execute() {
    const isCorrectPin = await PinGuard.getInstance().verify(this.params.pin);
    if (!isCorrectPin) return null;
    const token = await TokenGenerator.generate();
    this.params.model.sessionTokens.add(token);
    return token;
  }
}
