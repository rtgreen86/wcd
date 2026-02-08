import './YearCalendar.css';
import MonthCalendar from './MonthCalendar';

export default function YearCalendar({
  year = new Date().getUTCFullYear(),
  marks = {},
  onClick = () => undefined,
} : {
  year?: number,
  marks?: Record<string, string[]>,
  onClick?: (date: string) => void
}) {
  return (
    <div className="calendar-year">{
      Array.from({length: 12}, (el, idx) => (
        <MonthCalendar key={idx} year={year} month={idx + 1} marks={marks} onClick={onClick} />
      ))
    }</div>
  );
}
