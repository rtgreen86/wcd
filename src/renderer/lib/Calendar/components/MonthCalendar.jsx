import './MonthCalendar.css';
import React, { useContext } from 'react';
import useMonthsCaptions from '../hooks/useMonthsCaptions';
import DaysGrid from '../DaysGrid';
import WeekDays from './WeekDays';
import { noop } from '../lib/utils';
import { LocaleContext } from '../context/LocaleContext';

export default function MonthCalendar({
  year = new Date().getUTCFullYear(),
  month = new Date().getUTCMonth() + 1,
  marks,
  onClick = noop
}) {
  const monthCaptions = useMonthsCaptions();
  const locale = useContext(LocaleContext);

  return (
    <table className="calendar-month">
      <caption>{monthCaptions[month - 1]}</caption>
      <thead><WeekDays /></thead>
      <tbody><DaysGrid year={year} month={month} marks={marks} onClick={onClick} locale={locale} /></tbody>
    </table>
  );
}
