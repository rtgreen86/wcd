import React, { useState, useReducer, useEffect } from 'react';
import { MonthCalendar, YearCalendar } from './features/calendar';
import Status from './Status';

const initialState = {
  records: {},
  isLoading: true,
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

const onLoaded = (state, records) => {
  return {
    ...state,
    records: records,
    isLoading: false
  };
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'add':
      return add(state, action.payload);
    case 'remove':
      return remove(state, action.payload);
    case 'loaded':
      return onLoaded(state, action.payload);
    default:
      return state;
  }
}

export default function App() {
  const [date, setDate] = useState('');
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    (async () => {
      const result = await electronAPI.loadRecords();
      const records = JSON.parse(result);
      dispatch({ type: 'loaded', payload: records });
    })();
  }, []);

  const handleClick = (date) => {
    setDate(`Clicked: ${date}`);

    if (state.records[date]) {
      dispatch({ type: 'remove', payload: date });
    } else {
      dispatch({ type: 'add', payload: date });
    }
  }

  const handleSaveClick = (event) => {
    event.preventDefault();
    const content = JSON.stringify(state.records);
    electronAPI.saveRecords(content);
  }

  if (state.isLoading) {
    return <div>loading...</div>
  }

  return (<>
    <Status message={date} />
    <button onClick={handleSaveClick}>Save!</button>
    <YearCalendar year={1986} firstDayOfWeek={1} marks={state.records} onClick={handleClick} />
    <MonthCalendar year={1986} month={1} firstDayOfWeek={1} marks={state.records} onClick={handleClick} />
  </>);
}
