import {SecureStorage} from '../models/SecureStorage';

export class SecureStorageController {
  static async getPin() {
    return await new SecureStorage().getPinCode();
  }
}
