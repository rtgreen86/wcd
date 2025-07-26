import GetSecretValue from '@main/commands/secureStorage/GetSecretValue';
import PutSecretValue from '@main/commands/secureStorage/PutSecretValue';
import GetAppDataEncryptedContent from '@main/commands/fs/GetAppDataEncryptedContent';
import PutAppDataEncryptedContent from '@main/commands/fs/PutAppDataEncryptedContent';
import GenerateFSKey from '@main/commands/fs/GenerateFSKey';
import * as CONST from '@main/CONST';

export default class DataStorage {
  static async put(content: string) {
    const hexKey = await new GetSecretValue({ key: 'key' }).execute();
    await new PutAppDataEncryptedContent({
      filename: CONST.DATA_ENCRYPTED_FILENAME,
      hexKey,
      content
    }).execute();
  }

  static async get() {
    const hexKey = await new GetSecretValue({ key: 'key' }).execute();
    const command = new GetAppDataEncryptedContent({
      filename: CONST.DATA_ENCRYPTED_FILENAME,
      hexKey
    });
    try {
      return await command.execute();
    } catch (error) {
      if (error.code === 'ENOENT') return '';
      throw error;
    }
  }

  static async initializeFSKey() {
    const existsKey = await new GetSecretValue({ key: 'key' }).execute();
    if (!existsKey) {
      const newKey = await new GenerateFSKey().execute();
      await new PutSecretValue({ key: 'key', value: newKey }).execute();
    }
  }
}
