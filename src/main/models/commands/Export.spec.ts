import Export from './Export';
import FileSystem from '@main/services/FileSystem';

jest.mock('../../services/FileSystem')

describe('Exprt', () => {
  beforeAll(() => {
    jest.resetAllMocks();
  });

  it('should throw an error if no fsKey', async () => {
    const command = new Export({
      data: null,
      fsKey: null,
      sessionTokens: new Set()
    });
    await expect(command.execute()).rejects.toThrow();
  });

  it('should throw and error if no data', async () => {
    const command = new Export({
      data: null,
      fsKey: 'fs-key',
      sessionTokens: new Set()
    });
    await expect(command.execute()).rejects.toThrow();
  });

  it('should save file', async () => {
    jest.mocked(FileSystem.buildExportPath).mockReturnValue('path/to/file.json');
    const command = new Export({
      data: 'data',
      fsKey: 'fs-key',
      sessionTokens: new Set()
    });
    await command.execute();
    expect(FileSystem.putTextFile).toHaveBeenCalledWith('path/to/file.json', 'data');
  });
});
