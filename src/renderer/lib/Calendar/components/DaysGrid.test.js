import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import DaysGrid from './DaysGrid.jsx';

describe('DaysGrid', () => {
  describe.each([
    [2000, 1],
    [2000, 2],
    [2000, 4],
    [2001, 1],
    [2001, 2],
    [2001, 4],
  ])('rendered with %i-%i', (year, month) => {
    test('match snapshot', function () {
      const { asFragment } = render(<table><tbody><DaysGrid year={year} month={month} /></tbody></table>);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
