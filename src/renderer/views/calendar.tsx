import React from 'react';
import { CalendarLocale, YearCalendar } from '../lib/Calendar';
import MainPanel from '../components/MainPanel';
import { marksToggle } from '../actions';
import { useDispatch, useStore } from '../hooks';

export default function Calendar() {
  const store = useStore();
  const dispatch = useDispatch();

  const handleClick = (date: string) => {
    dispatch(marksToggle({
      [date]: ['red']
    }));
  };

  return (
    <>
      <MainPanel year={ store.year } onDispatch={ dispatch } />
      <main>
        <section>
          <CalendarLocale locale="ru-RU">
            <YearCalendar year={ store.year } marks={ store.marks } onClick={handleClick} />
          </CalendarLocale>
        </section>
      </main>
    </>
  );
}
