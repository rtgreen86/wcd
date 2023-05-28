import React from 'react';
import { useNavigate } from "react-router-dom";

import { Button } from './UIKit';

import { YearCalendar } from '../features/calendar';

export default function CalendarScreen() {
  const navigate = useNavigate();
  return (
    <main>
      <section>
        <Button onClick={() => navigate('/controls')}>Controls</Button>
      </section>

      <section>
        <YearCalendar />
      </section>
    </main>
  );
}
