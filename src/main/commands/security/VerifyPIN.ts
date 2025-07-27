import { Command } from '@shared/types';
import PinGuard from '@main/services/PinGuard';

export default class VerifyPIN implements Command<Promise<boolean>> {
  constructor(private params: {
    pin: string | null,
  }) { }

  execute() {
    return PinGuard.getInstance().verify(this.params.pin);
  }
}
