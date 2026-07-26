import { MasterKeyStorage } from './MasterKeyStorage';
import * as CONST from './const';

describe('MasterKeyStorage', () => {
  const hexKey = new Array(CONST.CRYPTO_KEY_SIZE).fill('10').join('');

  it('should save and load encryption key', async () => {
    const key = Buffer.alloc(CONST.CRYPTO_KEY_SIZE, hexKey, 'hex');
    const storage = MasterKeyStorage.getStorage();
    await storage.put(key);
    storage.wipe();
    await storage.load();
    const receivedKey = await storage.get();
    const receivedHexKey = receivedKey.toString('hex');
    expect(receivedHexKey).toEqual(hexKey);
  });
});
