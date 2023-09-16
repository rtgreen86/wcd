import KeyGen from "./KeyGen";

describe('KeyGen', () => {
  it('KeyGen', async () => {
    const buf = await new KeyGen().generate();
    const str = buf.toString('hex');
    const buf2 = Buffer.alloc(24, str, 'hex');
    expect(buf).toEqual(buf2);
    const str2 = buf2.toString('hex');
    expect(str2).toEqual(str);
  });
});
