import React from 'react';

import useWeekInfo from './useWeekInfo';

export default function DaysGrid({ year, month }) {
  const { weekend, firstDay } = useWeekInfo();

  const lastDay = new Date(year, month, 0).getDate();

  const days = Array.from({ length: lastDay }, (item, index) => {
    const dateObj = new Date(Date.UTC(year, month - 1, index + 1))
    const date = dateObj.getUTCDate();
    const caption = date.toString();
    const day = dateObj.getDay();
    const normalizeDay = day === 0 ? 7 : day;
    const isoDateTime = dateObj.toISOString();
    const [isoDate] = isoDateTime.split('T');
    const marks = [];
    if (weekend.includes(normalizeDay)) marks.push('weekend');
    return {
      isoDate,
      month,
      date,
      year,
      caption,
      day: normalizeDay,
      marks: marks.join(' ')
    }
  });

  const firstDay1 = days[0].day;


  let cellNum = 0;
  const offset = (7 + firstDay1 - firstDay) % 7;
  const grid = new Array(6);


  for (let i = 0; i < 6; i++) {
    grid[i] = new Array(7);
    for (let j = 0; j < 7; j++) {
      const data = days[cellNum - offset];
      grid[i][j] = {
        cellNum: cellNum,
        caption: '',
        marks: ''
      }

      if (data) {
        grid[i][j].isoDate = data.isoDate;
        grid[i][j].month = data.month;
        grid[i][j].date = data.date;
        grid[i][j].year = data.year;
        grid[i][j].caption = data.caption;
        grid[i][j].day = data.day;
        grid[i][j].marks = data.marks;
      }

      cellNum++;
    }
  }

  const columns = [];
  for (let i = 0; i < grid.length; i++) {
    const row = [];
    for (let j = 0; j < grid[i].length; j++) {
      row.push(<td key={grid[i][j].cellNum}>{grid[i][j].caption}</td>);
    }
    columns.push(<tr key={grid[i][0].cellNum}>{row}</tr>);
  }

  return columns;
}
