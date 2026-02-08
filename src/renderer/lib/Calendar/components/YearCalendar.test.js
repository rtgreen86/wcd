import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import YearCalendar from './YearCalendar';

describe('YearCalendar', () => {
  describe('rendered', () => {
    test('match snapshot', function () {
      const { asFragment } = render(<YearCalendar year={2000} />);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
