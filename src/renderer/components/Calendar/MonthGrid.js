import React from 'react';
import PropTypes from 'prop-types';
import MonthFactory from './MonthFactory';
import useMonthsCaptions from './useMonthsCaptions';
import useDaysOfWeek from './useDaysOfWeek';

export default function MonthGrid({
  year,
  month,
  firstDayOfWeek,
  weekendDays,
  marks,
  onClick,
}) {
  const factory = new MonthFactory({ firstDayOfWeek, weekendDays, marks });
  const {grid} = factory.buildMonth(year, month);

  const all = useMonthsCaptions();
  const current = all[month];

  const daysWeek = useDaysOfWeek();

  const handleDayClick = (date) => {
    if (date && onClick) onClick(date);
  }

  return (
    <table>
      <caption>{current}</caption>
      <thead><tr>{daysWeek.map((value) => <td key={value.caption} className={(value.isWeekend ? 'weekend ' : '')}>{value.caption}</td>)}</tr></thead>
      <tbody>{grid.map((row, index) => (
        <tr key={index}>{row.map(({cellNo, caption, isWeekend, marks, date}) => (
          <td
            key={cellNo}
            className={(isWeekend ? 'weekend ' : '') + marks}
            data-date={date}
            onClick={() => handleDayClick(date)}
          >{caption}</td>
        ))}</tr>
      ))}</tbody>
    </table>
  );
}

MonthGrid.propTypes = {
  year: PropTypes.number,
  firstDayOfWeek: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6]),
  weekendDays: PropTypes.arrayOf(PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6])),
  marks: PropTypes.objectOf(PropTypes.string),
  month: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onClick: PropTypes.func,
};

MonthGrid.defaultProps = {
  year: 1981,
  month: 8,
  firstDayOfWeek: 0,
  weekendDays: [0, 6],
  marks: {},
  onClick: () => {}
};
