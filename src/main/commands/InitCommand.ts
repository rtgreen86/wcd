import { Command } from '@shared/infra/Command';
import Model from '../models/Model';
import { isEncryptionSupported, isSafeStorageSupported } from '../services/FileSystemCrypto';
import { isKeyExists, putKey, getKey, createKey } from '../services/FileSystemCrypto';

export default class InitCommand implements Command<Promise<void>> {
  constructor (private model: Model) {}

  async execute() {
    this.model.isEncryptionSupported = isEncryptionSupported();
    this.model.isSafeStorageSupported = isSafeStorageSupported();
    this.model.fsKey = null

    if (this.model.isEncryptionSupported && this.model.isSafeStorageSupported) {
      if (await isKeyExists()) {
        this.model.fsKey = await getKey();
      } else {
        this.model.fsKey = await createKey();
        await putKey(this.model.fsKey);
      }
    }
  }
}
