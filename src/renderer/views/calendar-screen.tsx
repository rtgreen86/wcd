import React from 'react';
import { CalendarLocale } from '../lib/Calendar';
import MainPanel from '../components/MainPanel';
import { useDispatch, useStore } from '../hooks';
import CalendarContainer from '../components/calendar-container';
import './calendar-screen.css';

export default function CalendarScreen() {
  const store = useStore();
  const dispatch = useDispatch();

  return (
    <>
      <MainPanel year={ store.year } onDispatch={ dispatch } />
      <main className="container-xxl">
          <CalendarLocale locale="ru-RU">
            <CalendarContainer />
          </CalendarLocale>
      </main>
    </>
  );
}
