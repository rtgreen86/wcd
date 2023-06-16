import React, { useReducer } from 'react';
import { CalendarLocale, YearCalendar } from '../lib/Calendar';
import MainPanel from '../components/MainPanel.jsx';

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return state + 1;
    case 'decrement':
      return state - 1;
    default:
      return state;
  }
}

export default function CalendarScreen() {
  const [state, dispatch] = useReducer(reducer, new Date().getUTCFullYear());

  return (
    <>
      <MainPanel year={state} onChangeYear={dispatch} />
      <main><section><CalendarLocale locale="ru-RU"><YearCalendar year={state}/></CalendarLocale></section></main>
    </>
  );
}
