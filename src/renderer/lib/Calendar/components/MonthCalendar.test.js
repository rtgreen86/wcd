import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import MonthCalendar from './MonthCalendar.jsx';

describe('MonthCalendar', () => {
  describe.each([
    [2000, 1],
    [2000, 2],
    [2000, 4],
    [2001, 1],
    [2001, 2],
    [2001, 4],
  ])('rendered with %i-%i', (year, month) => {
    test('match snapshot', function () {
      const { asFragment } = render(<MonthCalendar year={year} month={month} />);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
