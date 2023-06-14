import React from 'react';
import useDaysOfWeek from '../hooks/useDaysOfWeek';

export default function WeekDays() {
  const daysOfWeek = useDaysOfWeek();
  return <tr>{daysOfWeek.map(({ cellNumber, marks, caption }) => <td key={ cellNumber } className={ marks.join(' ') }>{ caption }</td>)}</tr>;
}
