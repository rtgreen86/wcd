import React from 'react';
import { YearCalendar } from '../components/Calendar';

export default function CalendarScreen() {
  return (
    <main>
      <section>
        <YearCalendar year={2023} />
      </section>
    </main>
  );
}
