import React, { useState, useReducer } from 'react';
import { MonthCalendar, YearCalendar } from './features/calendar';
import Status from './Status';

const initialState = {
  records: {},
};

const defaultColor = 'red';

const add = (state, record) => ({
  ...state,
  records: {
    ...state.records,
    [record]: defaultColor
  }
});

const remove = (state, record) => {
  delete state.records[record];
  return {...state};
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'add':
      return add(state, action.payload);
    case 'remove':
      return remove(state, action.payload);
    default:
      return state;
  }
}

export default function App() {
  const [date, setDate] = useState('nothing clicked');
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleClick = (date) => {
    setDate(`Clicked: ${date}`);

    if (state.records[date]) {
      dispatch({ type: 'remove', payload: date });
    } else {
      dispatch({ type: 'add', payload: date });
    }
  }

  return (<>
    <Status message={date} />
    <YearCalendar year={1986} firstDayOfWeek={1} marks={state.records} onClick={handleClick} />
    <MonthCalendar year={1986} month={1} firstDayOfWeek={1} marks={state.records} onClick={handleClick} />
  </>);
}
