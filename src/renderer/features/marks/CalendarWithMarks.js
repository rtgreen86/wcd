import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { markSetted, markRemoved, fetchMarks } from './marksSlice';
import { MonthCalendar } from '../calendar';

export default function CalendarWithMarks() {
  const dispatch = useDispatch();

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();

  const { status, marks } = useSelector(state => state.marks);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMarks());
    }
  }, [dispatch, status])

  if (status !== 'succeeded') {
    return <div>Loading...</div>;
  }

  const handleClick = (date) => {
    if (!marks[date]) {
      dispatch(markSetted({ date, mark: 'red' }));
    } else {
      dispatch(markRemoved({ date }));
    }
  };

  return <MonthCalendar year={year} month={month} firstDayOfWeek={1} marks={marks} onClick={handleClick} />;
};
