import { safeStorage } from 'electron';
import { BinaryFile } from '../file-system/BinaryFile';
import { Directories } from '../file-system/Directories';
import { KeyStorage } from './types';
import * as CONST from './const';

export class MasterKeyStorage implements KeyStorage {
  private static instance: MasterKeyStorage;

  private key: Buffer | null = null;

  private file: BinaryFile = new BinaryFile(Directories.userDataFile(CONST.MASTERKEY_ENCRYPTED_FILENAME));

  static getStorage() {
    if (!MasterKeyStorage.instance) {
      MasterKeyStorage.instance = new MasterKeyStorage();
    }
    return this.instance;
  }

  protected constructor() { }

  get(): Readonly<Buffer> {
    if (!this.key) {
      throw new Error('Master Key is not loaded.');
    }
    return this.key;
  }

  async put(key: Buffer) {
    const data = safeStorage.encryptString(key.toString('hex'));
    await this.file.write(data);
    if (this.key) {
      this.key.fill(0);
    }
    this.key = Buffer.from(key);
  }

  async load() {
    const data = await this.file.read();
    const strkey = safeStorage.decryptString(data);
    const key = Buffer.from(strkey, 'hex');
    if (key.length !== CONST.CRYPTO_KEY_SIZE) {
      throw new Error('Masterkey is currupted.');
    }
    this.key = key;
  }

  wipe() {
    if (this.key) {
      this.key.fill(0);
      this.key = null;
    }
  }

  async isKeyExists(): Promise<boolean> {
    return this.file.canRead();
  }
}
