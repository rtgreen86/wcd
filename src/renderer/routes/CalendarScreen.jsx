import React from 'react';
import { CalendarLocale, YearCalendar } from '../lib/Calendar';

export default function CalendarScreen() {
  return (
    <main>
      <section>
        <CalendarLocale locale="en-EN"><YearCalendar /></CalendarLocale>
      </section>
    </main>
  );
}
