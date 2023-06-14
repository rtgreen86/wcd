import React from 'react';
import PropTypes from 'prop-types';
import useMonthsCaptions from './useMonthsCaptions';
import DaysGrid from '../../lib/Calendar/components/DaysGrid';
import WeekDays from '../../lib/Calendar/components/WeekDays';

export default function MonthGrid({
  year,
  month,
}) {
  const all = useMonthsCaptions();
  const current = all[month];

  return (
    <table>
      <caption>{current}</caption>
      <thead><WeekDays /></thead>
      <tbody><DaysGrid year={year} month={month + 1} /></tbody>
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
