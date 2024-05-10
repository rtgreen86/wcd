import { jest } from '@jest/globals';
import Authenticator from './Authenticator';
import PinValidator from './PinValidator';
import { KeyGenerator } from "../secure-storage";

jest.mock('./PinValidator');
jest.mock('../secure-storage');

describe('Authenticator', () => {
  beforeEach(() => {
    jest.mocked(KeyGenerator.generate).mockReturnValue('first-token')
  });

  let authenticator: Authenticator;
  let validator: PinValidator;

  beforeEach(() => {
    validator = new PinValidator();
    authenticator = new Authenticator(validator);
  });

  it('should return token', async () => {
    jest.mocked(validator.validate).mockResolvedValue(true);
    const token = await authenticator.getToken('0000');
    expect(token).toEqual('first-token');
  });

  it('should return null if PIN incorrect', async () => {
    jest.mocked(validator.validate).mockResolvedValue(false);
    const token = await authenticator.getToken('0000');
    expect(token).toEqual(null);
  });

  it('should validate token', () => {
    expect(authenticator.validateToken('first-token')).toBe(true);
  });

  it('should return false for incorrect token', () => {
    expect(authenticator.validateToken('invalid-token')).toBe(false);
  });

  it('reset should create new Token', async () => {
    jest.mocked(KeyGenerator.generate).mockReturnValue('last-token');
    await authenticator.reset();
    expect(authenticator.validateToken('last-token')).toBe(true);
  });
});
