import * as Storage from './Storage';
import { mkdtemp, rm } from 'node:fs/promises';
import { app } from 'electron';
import { tmpdir } from 'node:os';
import { join } from 'node:path';


describe.only('Storage', function () {
  let temp;

  beforeAll(async () => {
    temp = await mkdtemp(join(tmpdir(), 'wc-test-'));
  })

  afterAll(async () => {
    await rm(temp, {recursive: true})
  });

  beforeAll(() => {
    app.getPath.mockReturnValue(temp);
  });

  it('should save and then get saved content', async function () {
    await Storage.put('my-storage', '["test content"]');
    await expect(Storage.get('my-storage')).resolves.toEqual('["test content"]');
  });
});
