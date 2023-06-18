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

  const marks = {
    '2023-01-01': ['red'],
    '2023-01-03': ['weekend'],
    '2023-02-14': ['red'],
    '2023-03-08': ['red'],
    '2023-04-01': ['red'],
    '2023-05-08': ['red'],
    '2023-05-09': ['red'],
    '2023-09-01': ['red'],
  };

  return (
    <>
      <MainPanel year={state} onChangeYear={dispatch} />
      <main><section><CalendarLocale locale="ru-RU"><YearCalendar year={state} marks={marks} onClick={(date) => alert(date)} /></CalendarLocale></section></main>
    </>
  );
}
