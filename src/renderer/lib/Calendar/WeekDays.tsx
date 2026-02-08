import { useMemo } from 'react';
import { DEFAULT_LOCALE } from './CONST';
import { daysOfWeek } from './utils';

export default function WeekDays({
  locale = DEFAULT_LOCALE
} : {
  locale?: string,
}) {
  const week = useMemo(() => daysOfWeek(locale), [locale]);
  return <tr>{week.map(({ cellNumber, marks, caption }) => <td key={ cellNumber } className={ marks.join(' ') }>{ caption }</td>)}</tr>;
}
