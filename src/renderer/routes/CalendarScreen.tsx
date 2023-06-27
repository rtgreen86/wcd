import React, { useReducer, useCallback } from 'react';
import { CalendarLocale, YearCalendar } from '../lib/Calendar';
import MainPanel from '../components/MainPanel';

type Marks = {
  [date: string]: string[]
}

type State = {
  year: number,
  marks: {
    isLoading: boolean,
    data: Marks
  }
}

type YearIncrementAction = {
  type: 'year/increment'
}

type YearDecrementAction = {
  type: 'year/decrement'
}

type MarksLoadingAction = {
  type: 'marks/loading'
}

type MarksLoadedAction = {
  type: 'marks/loaded',
  payload: Marks
}

type MarksSetAction = {
  type: 'marks/set',
  payload: Marks
}

type MarksUnsetAction = {
  type: 'marks/unset',
  payload: string
}

type MarksToggleAction = {
  type: 'marks/toggle',
  payload: {
    date: string,
    marks: Marks[keyof Marks]
  }
}

type Action = YearIncrementAction | YearDecrementAction | MarksLoadingAction | MarksLoadedAction | MarksSetAction | MarksUnsetAction | MarksToggleAction;

const initialArg: State = {
  year: 0,
  marks: {
    isLoading: true,
    data: {}
  },
};

function init(initialArg: State) {
  return {
    ...initialArg,
    year: new Date().getFullYear(),
  };
}

function reducer(state: State, action: Action): State {
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
        data: { ...state.marks.data, ...action.payload }
      }
    }

    case 'marks/unset': return {
      ...state,
      marks: {
        ...state.marks,
        data: unsetMark(state.marks.data, action.payload)
      }
    }

    case 'marks/toggle': return state.marks.data[action.payload.date]
      ? reducer(state, { type: 'marks/unset', payload: action.payload.date })
      : reducer(state, { type: 'marks/set', payload: {[action.payload.date]: action.payload.marks} })
  }
}

const unsetMark = (marks: Marks, date: string) => Object.entries(marks)
  .filter(([key]) => key !== date)
  .reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {} as Marks);


export default function CalendarScreen() {
  const [state, dispatch] = useReducer(reducer, initialArg, init);

  const handleDateClick = useCallback((date: string) => {
    dispatch({ type: 'marks/toggle', payload: {date, marks: ['red']}});
  }, [dispatch]);

  return (
    <>
      <MainPanel year={ state.year } onDispatch={ dispatch } />
      <main><section><CalendarLocale locale="ru-RU"><YearCalendar year={ state.year } marks={ state.marks.data } onClick={handleDateClick} /></CalendarLocale></section></main>
    </>
  );
}
