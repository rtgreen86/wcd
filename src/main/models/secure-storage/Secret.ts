import keytar from 'keytar';

const service = 'su.malokhatko.wcalendar';

type Account = 'pin' | 'key';

export default class Secret {
  static get(account: Account) {
    return keytar.getPassword(service, account)
  }

  static put(account: Account, secret: string) {
    return keytar.setPassword(service, account, secret);
  }
}