import Model from '../models/Model';
import { Command } from '@shared/infra/Command';
import { t } from '@shared/translations';
import { isEncryptionSupported } from '../services/FileSystemCrypto';
import { isKeyExists, getKey } from '../services/FileSystemCrypto';

export default class InitEncryptionCmd implements Command<Promise<void>> {
  constructor(private model: Model) { }

  async execute() {
    this.model.encryptionSupported = isEncryptionSupported();

    if (!await isKeyExists()) {
      this.model.encryptionKey = null;
      return;
    }

    if (!this.model.encryptionSupported) {
      throw new Error(t('Encryption is not supported by the operating system.'));
    }

    try {
      this.model.encryptionKey = await getKey();
    } catch (error) {
      throw new Error(t('The operating system cannot decrypt the master key.'), {
        cause: error
      });
    }
  }
}
