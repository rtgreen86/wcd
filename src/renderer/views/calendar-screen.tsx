import React from 'react';
import { CalendarLocale } from '../lib/Calendar';
import MainPanel from '../components/MainPanel';
import { useDispatch, useStore } from '../hooks';
import CalendarContainer from '../components/calendar-container';

export default function CalendarScreen() {
  const store = useStore();
  const dispatch = useDispatch();

  return (
    <>
      <MainPanel year={ store.year } onDispatch={ dispatch } />
      <main>
        <section>
          <CalendarLocale locale="ru-RU">
            <CalendarContainer />
          </CalendarLocale>
        </section>
      </main>
    </>
  );
}
