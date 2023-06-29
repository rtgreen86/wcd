import {createRequestProcessor} from '../lib/RequestProcessor';
import {createStorageController} from './storageController';
import { mkdtemp, rm } from 'node:fs/promises';
import { app } from 'electron';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

describe('StorageController', function () {
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

  let requestProcessor;

  beforeAll(() => {
    requestProcessor = createRequestProcessor();
    requestProcessor.use(createStorageController());
  });

  it('should save and load data', async () => {
    const [date] = new Date().toISOString().split('T');

    await requestProcessor.handle({
      uri: '/marks',
      method: 'PUT',
      body: JSON.stringify({
        [date]: ['red']
      })
    });

    await expect(requestProcessor.handle({
      uri: '/marks',
      method: 'GET'
    })).resolves.toEqual({
      body: JSON.stringify({ [date]: ['red'] })
    });
  });
});
