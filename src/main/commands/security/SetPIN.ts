import { Command } from '@shared/types';
import PinGuard from '@main/services/PinGuard';

export default class SetPIN implements Command<Promise<boolean>> {
  constructor(private params: {
    pin: string | null,
    newPin: string,
  }) { }

  execute() {
    return PinGuard.getInstance().setPIN(this.params.pin, this.params.newPin);
  }
}
