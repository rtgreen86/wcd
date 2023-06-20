import React, { useReducer, useCallback } from 'react';
import { CalendarLocale, YearCalendar } from '../lib/Calendar';
import MainPanel from '../components/MainPanel.jsx';

const initialArg = {
  year: null,
  marks: {
    isLoading: true,
    data: {}
  },
};

function init(initialArg) {
  return {
    ...initialArg,
    year: new Date().getFullYear(),
  };
}

function reducer(state, action) {
  switch (action.type) {
    case 'year/increment': return {
      ...state,
      year: state.year + 1
    };

    case 'year/decrement': return {
      ...state,
      year: state.year - 1
    };

    case 'marks/loading': return {
      ...state,
      marks: {
        ...state.marks,
        isLoading: true
      }
    };

    case 'marks/loaded': return {
      ...state,
      marks: {
        ...state.marks,
        isLoading: false,
        data: action.payload
      }
    };

    case 'marks/set': return {
      ...state,
      marks: {
        ...state.marks,
        data: { ...state.marks.data, [action.payload.date]: action.payload.marks }
      }
    }

    case 'marks/unset': return {
      ...state,
      marks: {
        ...state.marks,
        data: Object.entries(state.marks.data)
          .filter(([key]) => key !== action.payload.date)
          .reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
          }, {})
      }
    }

    case 'marks/toggle': return state.marks.data[action.payload.date]
      ? reducer(state, { type: 'marks/unset', payload: action.payload })
      : reducer(state, { type: 'marks/set', payload: action.payload })
  }
}

export default function CalendarScreen() {
  const [state, dispatch] = useReducer(reducer, initialArg, init);

  const handleDateClick = useCallback((date) => {
    dispatch({ type: 'marks/toggle', payload: {date, marks: ['red']}});
  }, [dispatch]);

  return (
    <>
      <MainPanel year={ state.year } onDispatch={ dispatch } />
      <main><section><CalendarLocale locale="ru-RU"><YearCalendar year={ state.year } marks={ state.marks.data } onClick={handleDateClick} /></CalendarLocale></section></main>
    </>
  );
}
