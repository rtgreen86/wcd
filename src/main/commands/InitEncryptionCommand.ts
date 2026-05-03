import { Command } from '@shared/infra/Command';
import { t } from '@shared/translations';
import Model from '../models/Model';
import { isEncryptionSupported } from '../services/FileSystemCrypto';
import { isKeyExists, putKey, getKey, createKey } from '../services/FileSystemCrypto';

export default class InitCommand implements Command<Promise<void>> {
  constructor (private model: Model) {}

  async execute() {
    this.model.isEncryptionSupported = isEncryptionSupported();
    this.model.encryptionKey = null

    if (this.model.isEncryptionSupported) {
      try {
        this.model.encryptionKey = await getKey();
      } catch (error) {
        console.log(t('The operating system cannot decrypt the master key.'))

        throw new Error(t('The operating system cannot decrypt the master key.'), {
          cause: error
        });
      }
    }
  }
}
