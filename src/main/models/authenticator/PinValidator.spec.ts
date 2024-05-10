import { jest } from '@jest/globals';
import PinValidator from './PinValidator';
import PinCode from './PinCode';

jest.mock('./PinCode');

describe('PinValidator', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    jest.mocked(PinCode.check).mockReset();
    jest.mocked(PinCode.set).mockReset();
    jest.mocked(PinCode.remove).mockReset();
  });

  it('should validate PIN', async () => {
    jest.mocked(PinCode.check).mockResolvedValue(true);
    const validator = new PinValidator();
    const isCorrect = validator.validate('0000');
    jest.runAllTimers();
    await expect(isCorrect).resolves.toBe(true);
    expect(PinCode.check).toHaveBeenCalledWith('0000');
  });

  it('should throw when check in process', async () => {
    jest.mocked(PinCode.check).mockResolvedValue(false);
    const validator = new PinValidator();
    const attempt1 = validator.validate('0000');
    const attempt2 = validator.validate('0000');
    jest.runAllTimers();
    await expect(attempt1).resolves.toBe(false);
    await expect(attempt2).rejects.toThrow('Busy. Try again later.');
  });

  it('should change PIN', async () => {
    jest.mocked(PinCode.check).mockResolvedValue(true);
    const validator = new PinValidator();
    const success = validator.change('0000', '1111');
    jest.runAllTimers();
    await expect(success).resolves.toBe(true);
    expect(PinCode.set).toHaveBeenCalledWith('1111');
  });

  it('should not change PIN when PIN incorrect', async () => {
    jest.mocked(PinCode.check).mockResolvedValue(false);
    const validator = new PinValidator();
    const success = validator.change('0000', '1111');
    jest.runAllTimers();
    await expect(success).resolves.toBe(false);
    expect(PinCode.set).not.toHaveBeenCalled();
  });

  it('should throw when new PIN hat invalid format', async () => {
    const validator = new PinValidator();
    const promise = validator.change('0000', 'password');
    await expect(promise).rejects.toThrow('Invalid new PIN');
  });

  it('should remove PIN', async () => {
    jest.mocked(PinCode.check).mockResolvedValue(true);
    const validator = new PinValidator();
    const success = validator.remove('0000');
    jest.runAllTimers();
    await expect(success).resolves.toBe(true);
    expect(PinCode.remove).toHaveBeenCalled();
  });

  it('should not remove PIN when PIN is incorrect', async () => {
    jest.mocked(PinCode.check).mockResolvedValue(false);
    const validator = new PinValidator();
    const success = validator.remove('0000');
    jest.runAllTimers();
    await expect(success).resolves.toBe(false);
  });

  it('should check is PIN setted', async () => {
    jest.mocked(PinCode.check).mockReset().mockResolvedValue(false);
    const validator = new PinValidator();
    const isSetted = validator.isPinSetted();
    jest.runAllTimers();
    expect(PinCode.check).toHaveBeenCalledWith('');
    await expect(isSetted).resolves.toBe(true);
  });
});
