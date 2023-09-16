import KeyGenerator from "./KeyGenerator";

describe('KeyGenerator', () => {
  it('should generate string with length = 48', async () => {
    const key = await KeyGenerator.generateHex();
    expect(key.length).toBe(48);
  });
});
