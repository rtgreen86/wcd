import React, { useEffect } from 'react';
import { CalendarLocale, YearCalendar } from '../lib/Calendar';
import { useDispatch, useStore } from '../hooks';

export default function CalendarContainer() {
  const store = useStore();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!store.isLoading) return;

    const asyncOp = async () => {
      const raw = await electronAPI.fs.get('data', '');

      if (raw === '') {
        dispatch({ type: 'marks/loaded', payload: {} });
        return;
      }

      try {
        const marks = JSON.parse(raw);
        dispatch({ type: 'marks/loaded', payload: marks });
      } catch (err) {
        console.log('Loading Error');
      }
    }

    asyncOp();
  }, []);

  useEffect(() => {
    if (!store.isDirty) {
      return;
    }

    const raw = JSON.stringify(store.marks);

    electronAPI.fs.put('data', {
      body: raw,
      token: ''
    });

    dispatch({ type: 'marks/saved' });
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