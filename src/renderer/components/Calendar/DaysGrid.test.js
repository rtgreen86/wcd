import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import DaysGrid from './DaysGrid';

describe('DaysGrid', function () {
  it('should create grid', async function () {
    render(<DaysGrid year={2023} month={1} />);
    await screen.findAllByText('1');
    expect(screen.getAllByText('1')[0]).toHaveTextContent('1');
  });
});
