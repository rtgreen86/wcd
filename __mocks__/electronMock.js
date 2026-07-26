import { jest } from '@jest/globals';
import { mkdtemp, rm } from 'node:fs/promises';
import { Buffer } from 'node:buffer';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

export const app = {
  getPath(dir) {
    return directories[dir]
  }
}

const directories = {};

beforeAll(async () => {
  directories.userData = await mkdtemp(join(tmpdir(), 'wcd-test-userdata-'), 'utf8');
  directories.temp = await mkdtemp(join(tmpdir(), 'wcd-test-temp-'), 'utf8');
});

afterAll(async () => {
  await Promise.all(Object.values(directories).map(dir => {
    console.log('Delete %s', dir);
    return rm(dir, { recursive: true });
  }));
});

export const safeStorage = {
  decryptString: jest.fn().mockName('safeStorage.decryptString'),
  encryptString: jest.fn().mockName('safeStorage.encryptString')
}

beforeAll(() => {
  safeStorage.encryptString.mockImplementation((data) => Buffer.from(data, 'hex'));
  safeStorage.decryptString.mockImplementation((data) => data.toString('hex'));
});
