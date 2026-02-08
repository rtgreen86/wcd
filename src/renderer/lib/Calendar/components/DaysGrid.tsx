import { useMemo, MouseEvent } from 'react';
import { DEFAULT_LOCALE, GRID_COLUMNS } from '../CONST';
import { getDays, getWeekInfo } from '../utils';

export default function DaysGrid({
  year,
  month,
  locale = DEFAULT_LOCALE,
  marks = {},
  onClick = () => undefined
}: {
  year: number,
  month: number,
  locale?: string,
  marks?: Record<string, string[]>,
  onClick?: (date: string) => void,
}) {
  const weekInfo = useMemo(() => getWeekInfo(locale), [locale]);
  const days = getDays(year, month, weekInfo);
  const marksMap = new Map(Object.entries(marks));

  const getClassName = (marks: string[]) => marks.join(' ');
  const handleClick = (event: MouseEvent<HTMLElement>) => onClick(event.currentTarget.dataset.date);

  const daysWithMarks = days.map(day => marksMap.has(day.isoDate)
    ? { ...day, marks: [...day.marks, ...marksMap.get(day.isoDate)] }
    : day
  );

  const cells = daysWithMarks.map((day) => day.visible
    ? <td key={`cell-${day.cellNumber}`} className={getClassName(day.marks)} data-date={day.isoDate} onClick={handleClick} >{day.date.toString()}</td>
    : <td key={day.cellNumber}></td>
  );

  const grid = cells.reduce((_grid, cell, index, { length }) => {
    const row = _grid[_grid.length - 1];
    row.push(cell);
    if ((index + 1) % GRID_COLUMNS === 0 && index !== length - 1) {
      _grid.push([]);
    }
    return _grid;
  }, [[]]);

  return grid.map((row, index) => (<tr key={`row-${index}`}>{row}</tr>));
}
