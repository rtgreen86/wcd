import { Command } from '@main/types';
import PinGuard from '@main/services/PinGuard';

export default class RemovePIN implements Command<Promise<boolean>> {
  constructor(private params: {
    pin: string | null,
  }) { }

  execute() {
    return PinGuard.getInstance().removePIN(this.params.pin);
  }
}
