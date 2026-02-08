import './MonthCalendar.css';
import { useContext, useMemo } from 'react';
import DaysGrid from './DaysGrid';
import WeekDays from './WeekDays';
import { LocaleContext } from '../contexts/LocaleContext';
import { getMonthsCaptions } from '../utils';

export default function MonthCalendar({
  year = new Date().getUTCFullYear(),
  month = new Date().getUTCMonth() + 1,
  marks = {},
  onClick = () => undefined
}: {
  year?: number,
  month?: number,
  marks?: Record<string, string[]>,
  onClick?: (date: string) => void
}) {
  const locale = useContext(LocaleContext);
  const monthCaptions = useMemo(() => getMonthsCaptions(locale), [locale]);

  return (
    <table className="calendar-month">
      <caption>{monthCaptions[month - 1]}</caption>
      <thead><WeekDays locale={locale} /></thead>
      <tbody><DaysGrid year={year} month={month} marks={marks} onClick={onClick} locale={locale} /></tbody>
    </table>
  );
}
