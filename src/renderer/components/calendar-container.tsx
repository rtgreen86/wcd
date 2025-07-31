import React, { useEffect } from 'react';
import { CalendarLocale, YearCalendar } from '../lib/Calendar';
import { useDispatch, useStore } from '../hooks';
import { getMarks, putMarks } from '@api/apiBridge';

export default function CalendarContainer() {
  const store = useStore();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!store.isLoading) return;

    const asyncOp = async () => {
      const marks = await getMarks();

      const marks2 = {} as Record<string, string[]>;

      for (const date of marks) {
        marks2[date] = ['red'];
      }

      dispatch({ type: 'marks/loaded', payload: marks2 });
    }

    asyncOp();
  }, []);

  useEffect(() => {
    if (!store.isDirty) {
      return;
    }

    const asyncOp = async () => {
      await putMarks(Object.keys(store.marks));
      dispatch({ type: 'marks/saved' });
    }

    asyncOp();
  }, [ store.marks, store.isDirty ]);

  const handleClick = (date: string) => {
    dispatch({ type: 'marks/toggle', payload: { [date]: ['red'] } });
  };

  return (
    <CalendarLocale locale="ru-RU">
      {
        store.isLoading
          ? <div>Loading...</div>
          : <YearCalendar year={store.year} marks={store.marks} onClick={handleClick} />
      }
    </CalendarLocale>
  );
}