import React from 'react';

import { useDays } from './useDays';
import { gridColumns } from './Const';

export default function DaysGrid({ year, month }) {
  const days = useDays(year, month);

  return days.reduce((grid, day, index, { length }) => {
    const { visible, cellNumber, marks, date } = day;
    const className = marks.join(' ');

    const row = grid[grid.length - 1];

    row.push(visible
      ? <td key={`cell-${cellNumber}`} className={className}>{date.toString()}</td>
      : <td key={cellNumber}></td>);

    if ((index + 1) % gridColumns === 0 || index === length - 1) {
      grid[grid.length - 1] = <tr key={`row-${grid.length}`}>{grid[grid.length - 1]}</tr>;
      grid.push([]);
    }

    return grid;
  }, [[]]);
}

