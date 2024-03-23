// TODO: delete

import {jest} from '@jest/globals';

import { mkdtemp, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

export const app = {
  getPath: jest.fn()
}

const directories = {};

beforeAll(async () => {
  directories.userData = await createUserData();
});

afterAll(async () => {
  await Promise.all(Object.values(directories).map(dir => {
    console.log('Delete %s', dir);
    return rm(dir, { recursive: true });
  }))
});

beforeAll(async () => {
  app.getPath.mockImplementation((dir) => directories[dir]);
});

async function createUserData() {
  return await mkdtemp(join(tmpdir(), 'wc-test-userdata-'), 'utf8');
}
