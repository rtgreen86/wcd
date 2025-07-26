import GetValue from '@main/commands/secureStorage/GetValue';
import PutValue from '@main/commands/secureStorage/PutValue';
import RemoveKey from '@main/commands/secureStorage/RemoveKey';

export default class SecretFacade {
  static get(key: string) {
    return new GetValue({key}).execute();
  }

  static put(key: string, value: string) {
    return new PutValue({key, value}).execute();
  }

  static remove(key: string) {
    return new RemoveKey({key}).execute();
  }
}
