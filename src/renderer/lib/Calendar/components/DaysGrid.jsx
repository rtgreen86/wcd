import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import useDays from '../hooks/useDays';
import { gridColumns } from '../lib/Const';
import { noop } from '../lib/utils';

export default function DaysGrid({ year, month, marks = {}, onClick = noop }) {
  const days = useDays(year, month);

  const marksMap = new Map(Object.entries(marks));

  const markedDays = days.map(day => {
    return marksMap.has(day.isoDate) ? {
      ...day,
      marks: [...day.marks, ...marksMap.get(day.isoDate)]
    } : day
  });

  const handleClick = useCallback((event) => {
    onClick(event.currentTarget.dataset.date);
  }, [onClick]);

  return markedDays.reduce((grid, day, index, { length }) => {
    const { visible, cellNumber, marks, date, isoDate } = day;
    const className = marks.join(' ');

    const row = grid[grid.length - 1];

    row.push(visible
      ? <td key={`cell-${cellNumber}`} className={className} data-date={isoDate} onClick={handleClick} >{date.toString()}</td>
      : <td key={cellNumber}></td>);

    if ((index + 1) % gridColumns === 0 || index === length - 1) {
      grid[grid.length - 1] = <tr key={`row-${grid.length}`}>{grid[grid.length - 1]}</tr>;
      grid.push([]);
    }

    return grid;
  }, [[]]);
}

DaysGrid.propTypes = {
  year: PropTypes.number,
  month: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  marks: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)),
  onClick: PropTypes.func
};
