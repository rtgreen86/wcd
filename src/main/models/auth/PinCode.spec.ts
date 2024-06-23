import { jest } from '@jest/globals';
import PinCode from './PinCode';

jest.mock('../secure-storage');

import { Secret } from '../secure-storage';

describe('PinCode', () => {
  beforeAll(() => jest.useFakeTimers());

  afterAll(() => jest.useRealTimers());

  let pinCode: PinCode;

  beforeEach(() => {
    jest.resetAllMocks();
    pinCode = new PinCode();
  });

  describe('checkPin', () => {
    it('should authenticate if PIN code not set', async () => {
      jest.mocked(Secret.get).mockResolvedValue(null);
      const promise = pinCode.checkPin('');
      jest.runAllTimers();
      await expect(promise).resolves.toBe(true);
    });

    it('should authenticate if PIN is correct', async () => {
      jest.mocked(Secret.get).mockResolvedValue('0000');
      const promise = pinCode.checkPin('0000');
      jest.runAllTimers();
      await expect(promise).resolves.toBe(true);
    });

    it('should NOT authenticate if PIN is incorrect', async () => {
      jest.mocked(Secret.get).mockResolvedValue('0000');
      const promise = pinCode.checkPin('5555');
      jest.runAllTimers();
      await expect(promise).resolves.toBe(false);
    });
  });

  describe('checkIsPinSetted', () => {
    it('should return true if PIN is setted', async () => {
      jest.mocked(Secret.get).mockResolvedValue('0000');
      await expect(pinCode.checkIsPinSetted()).resolves.toBe(true);
    });

    it('should return false if PIN is NOT setted', async () => {
      jest.mocked(Secret.get).mockResolvedValue(null);
      await expect(pinCode.checkIsPinSetted()).resolves.toBe(false);
    });
  });

  describe('setPin', () => {
    it('should set new PIN', async () => {
      jest.mocked(Secret.get).mockResolvedValue('0000');
      jest.mocked(Secret.put).mockResolvedValue();
      const promise = pinCode.setPin('0000', '5555');
      jest.runAllTimers();
      await expect(promise).resolves.toBe(true);
      expect(Secret.put).toHaveBeenCalledWith('pin', '5555');
    });

    it('should not set PIN if old pin is incorrect', async () => {
      jest.mocked(Secret.get).mockResolvedValue('0000');
      jest.mocked(Secret.put).mockResolvedValue();
      const promise = pinCode.setPin('1111', '2222');
      jest.runAllTimers();
      await expect(promise).resolves.toBe(false);
      expect(Secret.put).not.toHaveBeenCalled();
    });

    it('should remove PIN', async () => {
      jest.mocked(Secret.get).mockResolvedValue('0000');
      jest.mocked(Secret.remove).mockResolvedValue(true);
      const promise = pinCode.setPin('0000', null);
      jest.runAllTimers();
      await expect(promise).resolves.toBe(true);
      expect(Secret.remove).toHaveBeenCalledWith('pin');
    });

    it('should not remove PIN if old pin is incorrect', async () => {
      jest.mocked(Secret.get).mockResolvedValue('0000');
      jest.mocked(Secret.remove).mockResolvedValue(true);
      const promise = pinCode.setPin('1111', null);
      jest.runAllTimers();
      await expect(promise).resolves.toBe(false);
      expect(Secret.remove).not.toHaveBeenCalled();
    });
  });
});
