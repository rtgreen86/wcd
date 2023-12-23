import keytar from 'keytar';

const applicationName = 'su.malokhatko.wcalendar';
const account = 'pin';

export class SecureStorage {
  getPinCode() {
    return keytar.getPassword(applicationName, account);
  }
}
