import React from 'react';
import PropTypes from 'prop-types';
import useMonthsCaptions from '../hooks/useMonthsCaptions';
import DaysGrid from './DaysGrid';
import WeekDays from './WeekDays';

export default function MonthCalendar({ year, month }) {
  const monthCaptions = useMonthsCaptions();
  return (
    <table>
      <caption>{monthCaptions[month - 1]}</caption>
      <thead><WeekDays /></thead>
      <tbody><DaysGrid year={year} month={month} /></tbody>
    </table>
  );
}

MonthCalendar.propTypes = {
  year: PropTypes.number,
  month: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
};

MonthCalendar.defaultProps = {
  year: new Date().getUTCFullYear(),
  month: new Date().getUTCMonth() + 1
}
