import { jest } from '@jest/globals';
import { CipherKey } from './CipherKey';
import { name as applicationName } from '../../../../package.json';

jest.mock('../../../lib/secure-storage');

import { getPassword, setPassword } from '../../../lib/secure-storage';

describe('CipherKey', () => {
  beforeEach(() => {
    jest.mocked(getPassword).mockResolvedValue('test-key');
    jest.mocked(setPassword).mockResolvedValue();
  });

  it('should generate keys', () => {
    expect(CipherKey.generateKey(192)).toEqual(expect.any(String));
  });

  it('should call getPassword', async () => {
    await expect(CipherKey.getKey()).resolves.toEqual('test-key');
    expect(getPassword).toHaveBeenCalledWith(applicationName, 'security key');
  });

  it('should call setPassword', async () => {
    await CipherKey.setKey('test-key');
    expect(setPassword).toHaveBeenCalledWith(applicationName, 'security key', 'test-key');
  });
});
