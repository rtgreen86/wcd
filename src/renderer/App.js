import React, { useState, useReducer } from 'react';
import { MonthCalendar, YearCalendar } from './features/calendar';
import Status from './Status';

const initialState = {
  records: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'add':
      return {
        records: {
          ...state.records,
          [action.payload]: 'blue'
        }
      };
    default:
      return state;
  }
}

export default function App() {
  const [date, setDate] = useState('nothing clicked');
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleClick = (date) => {
    setDate(`Clicked: ${date}`);
    dispatch({
      type: 'add',
      payload: date
    });
  }

  return (<>
    <Status message={date} />
    <YearCalendar year={1986} firstDayOfWeek={1} marks={state.records} onClick={handleClick} />
    <MonthCalendar year={1986} month={1} firstDayOfWeek={1} marks={state.records} onClick={handleClick} />
  </>);
}
