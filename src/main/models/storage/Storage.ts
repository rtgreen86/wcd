import { AppData } from '../../../lib/fs';
import { Secret } from '../secure-storage';

export const Storage = {
  async encryptPut(filename: string, content: string) {
    const hexKey = await Secret.get('key');
    return AppData.getEncryptedFile(filename, hexKey).write(content);
  },

  async encryptGet(filename: string) {
    const hexKey = await Secret.get('key');
    return AppData.getEncryptedFile(filename, hexKey).read();
  },

  async encryptGetSafe(filename: string) {
    try {
      return await Storage.encryptGet(filename);
    } catch (error) {
      if (error.code === 'ENOENT') return '';
      throw error;
    }
  }
}
