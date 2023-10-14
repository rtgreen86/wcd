import { union, diff, inter, symDiff } from './index';

describe('set-ops', () => {
  it ('should union two sets', () => {
    const A = new Set(['a', 'b', 'c']);

    const B = new Set(['c', 'b', 'd']);

    expect(
      union(A, B)
    ).toEqual(
      new Set(['a', 'b', 'c', 'd'])
    );
  });

  it ('should difference two sets', () => {
    const A = new Set(['a', 'b', 'c']);

    const B = new Set(['c', 'b', 'd']);

    expect(
      diff(A, B)
    ).toEqual(
      new Set(['a'])
    );
  });

  it ('should intersection two sets', () => {
    const A = new Set(['a', 'b', 'c']);

    const B = new Set(['c', 'b', 'd']);

    expect(
      inter(A, B)
    ).toEqual(
      new Set(['b', 'c'])
    );
  });

  it ('should symmetric intersection two sets', () => {
    const A = new Set(['a', 'b', 'c']);

    const B = new Set(['c', 'b', 'd']);

    expect(
      symDiff(A, B)
    ).toEqual(
      new Set(['a', 'd'])
    );
  });
});
