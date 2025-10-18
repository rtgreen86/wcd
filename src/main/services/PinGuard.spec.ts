import { jest } from '@jest/globals';
import PinGuard from './PinGuard';

import {getSecret, putSecret, removeSecret} from '@main/services/secureStorage';

jest.mock('../services/secureStorage');

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
      jest.mocked(getSecret).mockResolvedValue(storedPin);
      const promise = PinGuard.getInstance().verify(pin);
      jest.runAllTimers();
      await expect(promise).resolves.toEqual(expected);
    });
  });

  describe('setPIN', () => {
    it('should set PIN', async () => {
      jest.mocked(getSecret).mockResolvedValue(null);
      const promise = PinGuard.getInstance().setPin(null, '0000');
      jest.runAllTimers();
      await expect(promise).resolves.toEqual(true);
      expect(putSecret).toHaveBeenCalled();
    });

    it('should not set PIN when old PIN incorrect', async () => {
      jest.mocked(getSecret).mockResolvedValue('0000');
      const promise = PinGuard.getInstance().setPin(null, '0000');
      jest.runAllTimers();
      await expect(promise).resolves.toEqual(false);
      expect(putSecret).not.toHaveBeenCalled();
    });
  });

  describe('removePIN', () => {
    it('should remove PIN', async () => {
      jest.mocked(getSecret).mockResolvedValue('0000');
      const promise = PinGuard.getInstance().removePin('0000');
      jest.runAllTimers();
      await expect(promise).resolves.toEqual(true);
      expect(removeSecret).toHaveBeenCalled();
    });

    it('should not remove PIN when old PIN incorrect', async () => {
      jest.mocked(getSecret).mockResolvedValue('0000');
      const promise = PinGuard.getInstance().removePin('1111');
      jest.runAllTimers();
      await expect(promise).resolves.toEqual(false);
      expect(putSecret).not.toHaveBeenCalled();
    });
  });

  describe('isSettedPIN', () => {
    it.each([
      [false, null],
      [true, '0000']
    ])('should return %s when stored PIN %s', async (expected, storedPin) => {
      jest.mocked(getSecret).mockResolvedValue(storedPin);
      const promise = PinGuard.getInstance().isSettedPin();
      jest.runAllTimers();
      await expect(promise).resolves.toEqual(expected);
    });
  });
});
