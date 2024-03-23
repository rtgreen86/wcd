import './calendar-screen.css';
import React, { useEffect } from 'react';
import { CalendarLocale } from '../lib/Calendar';
import CalendarContainer from '../components/calendar-container';

export default function CalendarScreen() {
  useEffect(() => {
    runPrototypeCode();
  });

  return (
    <main className="container-xxl">
        <CalendarLocale locale="ru-RU">
          <CalendarContainer />
        </CalendarLocale>
    </main>
  );
}

async function runPrototypeCode() {
  console.log('Starting prototype code form CalendarScreen...');

  const testString = 'Test Information.';
  const filename = 'my-file';

  console.log('Content:', testString);
  console.log('Saving to %s...', filename);

  console.log('Done');
  console.log('Reading data...');

  const data = 'static content';

  console.log('Done');
  console.log('Content: ', data);
  console.log('OK');
}