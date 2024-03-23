import { AppData } from '../../../lib/app-data';
import { Secret } from '../secure-storage';

export default class Storage {
  static async put(name: string, content: string) {
    const file = AppData.getFile(name);
    file.content = content;
    await file.save();
  }

  static async get(name: string): Promise<string> {
    try {
      const file = AppData.getFile(name);
      await file.load();
      return file.content;
    } catch (error) {
      if (error.code === 'ENOENT') return '';
      throw error;
    }
  }

  static async cipheredPut(name: string, content: string) {
    const hexKey = await Secret.get('key');
    const file = AppData.getCipheredFile(name, hexKey);
    file.content = content;
    await file.save();
  }

  static async cipheredGet(name: string): Promise<string> {
    try {
      const hexKey = await Secret.get('key');
      const file = AppData.getCipheredFile(name, hexKey);
      await file.load();
      return file.content;
    } catch (error) {
      if (error.code === 'ENOENT') return '';
      throw error;
    }
  }
}
