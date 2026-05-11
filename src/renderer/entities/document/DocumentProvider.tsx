import React, { useMemo, useReducer, useContext, useEffect } from 'react';
import { Action, State, Marks } from './types';
import { defaultState, DocumentContext } from './DocumentContext';

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "setMarks":
      return { ...state, marks: action.payload, isLoading: false };
    case "toggleMark":
      return { ...state, marks: toggleMarks(state.marks, action.payload.date, action.payload.marks) };
    default:
      return state;
  }
}

function toggleMarks(marks: Marks, date: string, newMarks: string[]) {
  return marks;
}

export function DocumentProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, defaultState());
  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  return <DocumentContext value={value}>{children}</DocumentContext>;
}

export function useDocument() {
  const { state, dispatch } = useContext(DocumentContext);

  useEffect(() => {
    if (!state.isLoading) return;

    const init = () => {
      dispatch({ type: 'loading' });
      setTimeout(() => dispatch({
        type: 'setMarks',
        payload: { '0000-00-00': ['red'] }
      }), 3000);
    }

    init();
  }, []);

  return { state, dispatch };
}
