import React, { useMemo } from 'react';

import useWeekInfo from './useWeekInfo';

export default function DaysGrid({ year, month }) {
  const { weekend, firstDay } = useWeekInfo();

  const normalizeDay = day => day === 0 ? 7 : day;

  const getISODate = dateObj => dateObj.toISOString()[0];

  const getDate = (utcYear, utcMonth, utcDate, dateObj = new Date(Date.UTC(utcYear, utcMonth, utcDate))) => ({
    date: dateObj.getUTCDate(),
    day: normalizeDay(dateObj.getUTCDay()),
    isoDate: getISODate(dateObj),
  });

  const { date: firstMDate, day: firstMDay } = getDate(year, month - 1, 1);
  const { date: lastMDate } = getDate(year, month, 0);

  const gridRows = 6;
  const gridColumns = 7;
  const gridCellsCount = gridRows * gridColumns;
  const offset = (7 + firstMDay - firstDay) % 7;

  return useMemo(() => Array.from({ length: gridCellsCount }, (item, index) => ({cellNumber: index, marks: []}))

    .map(({cellNumber, ...rest}) => ({
      cellNumber,
      date: cellNumber + 1 - offset,
      ...rest
    }))

    .map(({date, ...rest}) => ({
      date,
      visible: date >= firstMDate && date <= lastMDate,
      ...rest
    }))

    .map(({date, ...rest}) => ({ ...getDate(year, month - 1, date), ...rest }))

    .map(({marks, day, ...rest}) => ({
      marks: weekend.includes(day)
        ? ['weekend', ...marks]
        : marks,
      day,
      ...rest
    }))

    .map(({ date, ...rest }) => ({
      date,
      text: date.toString(),
      ...rest
    }))

    .map(({ visible, cellNumber, text, marks }) => (
      visible
        ? <td key={cellNumber} className={marks.join(' ')}>{text}</td>
        : <td key={cellNumber}></td>
    ))

    .reduce(({ rows, columns }, item, index, { length }) => {
      columns.push(item);
      if (index !== 0 && (index + 1) % 7 === 0 || index === length - 1) {
        rows.push(<tr key={rows.length}>{columns}</tr>);
        columns = [];
      }
      return { rows, columns };
    }, { rows: [], columns: []}).rows,

  [year, month, gridCellsCount, offset, weekend]);
}
