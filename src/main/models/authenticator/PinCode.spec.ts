import { jest } from '@jest/globals';
import PinCode from './PinCode';

jest.mock('../secure-storage');

import { Secret } from '../secure-storage';

describe('PinCode', () => {
  it('check should return true if PIN code correct', async () => {
    jest.mocked(Secret.get).mockResolvedValue('0000');
    await expect(PinCode.check('0000')).resolves.toEqual(true);
  });

  it('check should return false if PIN code incorrect', async () => {
    jest.mocked(Secret.get).mockResolvedValue('0000');
    await expect(PinCode.check('1111')).resolves.toEqual(false);
  });

  it('check should return true if PIN code is not setted', async () => {
    jest.mocked(Secret.get).mockResolvedValue(null);
    await expect(PinCode.check('')).resolves.toEqual(true);
  });

  it('set should call Secret.put', async () => {
    await PinCode.set('0000');
    expect(Secret.put).toHaveBeenCalledWith('pin', '0000');
  });

  it('remove should call Secret.remove', async () => {
    await PinCode.remove();
    expect(Secret.remove).toHaveBeenCalledWith('pin');
  });
});
