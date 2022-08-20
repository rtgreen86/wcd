import React, { useState } from 'react';
import { MonthCalendar, YearCalendar } from './features/calendar';
import Status from './Status';


export default function App() {
  const [date, setDate] = useState('nothing clicked');

  const [marks, setMarks] = useState({
    "1986-01-03": 'green',
    "1986-02-14": 'blue'
  });

  const handleClick = (date) => {
    setDate(`Clicked: ${date}`);
    setMarks({
      ...marks,
      [date]: 'blue'
    });
  }

  return (<>
    <Status message={date} />
    <YearCalendar year={1986} firstDayOfWeek={1} marks={marks} onClick={handleClick} />
    <MonthCalendar year={1986} month={1} firstDayOfWeek={1} marks={marks} onClick={handleClick} />
  </>);
}
