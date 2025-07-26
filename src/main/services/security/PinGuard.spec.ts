import { jest } from '@jest/globals';
import PinGuard from './PinGuard';

import GetSecretValue from '@main/commands/secureStorage/GetSecretValue';
import PutSecretValue from '@main/commands/secureStorage/PutSecretValue';
import RemoveSecretKey from '@main/commands/secureStorage/RemoveSecretKey';

jest.mock('../../commands/secureStorage/GetSecretValue')
jest.mock('../../commands/secureStorage/PutSecretValue')
jest.mock('../../commands/secureStorage/RemoveSecretKey')

describe('PinGuard', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  describe('verify', () => {
    it.each([
      [true, null, null],
      [false, null, '0000'],
      [true, '0000', '0000'],
      [false, '1111', '0000']
    ])('should return %s for %s when stored PIN %s', async (expected, pin, storedPin) => {
      jest.mocked(GetSecretValue.prototype.execute).mockResolvedValue(storedPin);
      const promise = PinGuard.getInstance().verify(pin);
      jest.runAllTimers();
      await expect(promise).resolves.toEqual(expected);
    });
  });

  describe('setPIN', () => {
    it('should set PIN', async () => {
      jest.mocked(GetSecretValue.prototype.execute).mockResolvedValue(null);
      const promise = PinGuard.getInstance().setPIN(null, '0000');
      jest.runAllTimers();
      await expect(promise).resolves.toEqual(true);
      expect(PutSecretValue.prototype.execute).toHaveBeenCalled();
    });

    it('should not set PIN when old PIN incorrect', async () => {
      jest.mocked(GetSecretValue.prototype.execute).mockResolvedValue('0000');
      const promise = PinGuard.getInstance().setPIN(null, '0000');
      jest.runAllTimers();
      await expect(promise).resolves.toEqual(false);
      expect(PutSecretValue.prototype.execute).not.toHaveBeenCalled();
    });
  });

  describe('removePIN', () => {
    it('should remove PIN', async () => {
      jest.mocked(GetSecretValue.prototype.execute).mockResolvedValue('0000');
      const promise = PinGuard.getInstance().removePIN('0000');
      jest.runAllTimers();
      await expect(promise).resolves.toEqual(true);
      expect(RemoveSecretKey.prototype.execute).toHaveBeenCalled();
    });

    it('should not remove PIN when old PIN incorrect', async () => {
      jest.mocked(GetSecretValue.prototype.execute).mockResolvedValue('0000');
      const promise = PinGuard.getInstance().removePIN('1111');
      jest.runAllTimers();
      await expect(promise).resolves.toEqual(false);
      expect(PutSecretValue.prototype.execute).not.toHaveBeenCalled();
    });
  });

  describe('isSettedPIN', () => {
    it.each([
      [false, null],
      [true, '0000']
    ])('should return %s when stored PIN %s', async (expected, storedPin) => {
      jest.mocked(GetSecretValue.prototype.execute).mockResolvedValue(storedPin);
      const promise = PinGuard.getInstance().isSettedPIN();
      jest.runAllTimers();
      await expect(promise).resolves.toEqual(expected);
    });
  });
});
