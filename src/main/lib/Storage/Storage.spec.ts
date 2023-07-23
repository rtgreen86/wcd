import Storage from './Storage';

describe('Storage', () => {
  type TestItem = {
    id?: number,
    date: string,
    marks: string[]
  };

  let storage: Storage<TestItem>;

  beforeEach(() => {
    storage = new Storage<TestItem>();
  });

  describe('method put', () => {
    it('should return new record', async () => {
      await expect(storage.put({
        date: '2000-01-01',
        marks: []
      })).resolves.toEqual({
        id: 0,
        date: '2000-01-01',
        marks: []
      });
    });

    it('should increment id', async () => {
      await storage.put({
        id: -1,
        date: '2000-01-01',
        marks: []
      });

      await storage.put({
        id: -1,
        date: '2000-02-01',
        marks: []
      });

      await expect(storage.getAll()).resolves.toEqual([
        {
          id: 0,
          date: '2000-01-01',
          marks: []
        },
        {
          id: 1,
          date: '2000-02-01',
          marks: []
        }
      ]);
    });

    it('should replace records with same id', async () => {
      await storage.put({
        id: 0,
        date: '2000-01-01',
        marks: []
      });

      await storage.put({
        id: 0,
        date: '2000-02-01',
        marks: []
      });

      await expect(storage.getAll()).resolves.toEqual([
        {
          id: 0,
          date: '2000-02-01',
          marks: []
        }
      ]);
    });
  });

  describe('getById should', () => {
    beforeEach(async () => {
      await storage.put({
        id: -1,
        date: '2000-01-01',
        marks: []
      });

      await storage.put({
        id: -1,
        date: '2000-02-01',
        marks: []
      });
    });

    it('should return item by id', async () => {
      await expect(storage.getById({id: 1})).resolves.toEqual({
        id: 1,
        date: '2000-02-01',
        marks: []
      });
    });
  })
});
