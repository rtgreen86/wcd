import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import WeekDays from './WeekDays.jsx';

describe('WeekDays', () => {
  describe('rendered', () => {
    test('match snapshot', () => {
      const actual = render(<table><thead><WeekDays /></thead></table>);
      expect(actual.asFragment()).toMatchSnapshot();
    });
  });
});
