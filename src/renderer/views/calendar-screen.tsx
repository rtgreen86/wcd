import './calendar-screen.css';
import React from 'react';
import { CalendarLocale } from '../lib/Calendar';
import CalendarContainer from '../components/calendar-container';

export default function CalendarScreen() {
  return (
    <main className="container-xxl">
        <CalendarLocale locale="ru-RU">
          <CalendarContainer />
        </CalendarLocale>
    </main>
  );
}
