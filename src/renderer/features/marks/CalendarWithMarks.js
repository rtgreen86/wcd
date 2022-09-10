import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { markSetted, markRemoved } from './marksSlice';
import { MonthCalendar } from '../calendar';

export default function CalendarWithMarks() {
  const dispatch = useDispatch();

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();

  const marks = useSelector(state => state.marks);

  const handleClick = (date) => {
    if (!marks[date]) {
      dispatch(markSetted({ date, mark: 'red' }));
    } else {
      dispatch(markRemoved({ date }));
    }
  };

  return <MonthCalendar year={year} month={month} firstDayOfWeek={1} marks={marks} onClick={handleClick} />;
};
