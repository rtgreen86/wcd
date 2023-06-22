import './MonthCalendar.css';
import React from 'react';
import PropTypes from 'prop-types';
import useMonthsCaptions from '../hooks/useMonthsCaptions';
import DaysGrid from './DaysGrid';
import WeekDays from './WeekDays';
import { noop } from '../lib/utils';

export default function MonthCalendar({
  year = new Date().getUTCFullYear(),
  month = new Date().getUTCMonth() + 1,
  marks,
  onClick = noop
}) {
  const monthCaptions = useMonthsCaptions();
  return (
    <table className="calendar-month">
      <caption>{monthCaptions[month - 1]}</caption>
      <thead><WeekDays /></thead>
      <tbody><DaysGrid year={year} month={month} marks={marks} onClick={onClick} /></tbody>
    </table>
  );
}

MonthCalendar.propTypes = {
  year: PropTypes.number,
  month: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  marks: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)),
  onClick: PropTypes.func
};
