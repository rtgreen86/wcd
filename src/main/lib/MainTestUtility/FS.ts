import { mkdtemp, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { app } from 'electron';

import { isMock } from './isMock';

type Context = {
  pathToDir?: string
};

export const usingFs = (fn: (context: Context) => void) => () => {
  const context = {} as Context;

  beforeAll(async () => {
    context.pathToDir = await mkdtemp(join(tmpdir(), 'wc-test-'), 'utf8');
  });

  afterAll(async () => {
    await rm(context.pathToDir, { recursive: true })
  });

  beforeAll(() => {
    const getPath = app.getPath;
    if (isMock<typeof getPath>(getPath)) {
      getPath.mockReturnValue(context.pathToDir);
    }
  });

  fn(context);
};
