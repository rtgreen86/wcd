import GetValue from '@main/commands/secureStorage/GetSecretValue';
import PutValue from '@main/commands/secureStorage/PutSecretValue';
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
