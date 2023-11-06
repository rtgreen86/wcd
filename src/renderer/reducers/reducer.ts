import { Action } from "../actions";
import { State } from '../state';
import { union, diff, symDiff } from '../../lib/set-op';

export default function reducer(state: State, action: Action): State {
  switch(action.type) {
    case "year/increment": return {
      ...state,
      year: state.year + 1
    };

    case "year/decrement": return {
      ...state,
      year: state.year - 1
    };

    case "marks/set": return {
      ...setMarks(state, action),
      isDirty: true
    }

    case "marks/unset": return {
      ...unsetMarks(state, action),
      isDirty: true
    }

    case "marks/toggle": return {
      ...toggleMarks(state, action),
      isDirty: true
    }

    case "marks/loaded": return {
      ...state,
      marks: action.payload,
      isLoading: false
    };

    case "marks/saved": return {
      ...state,
      isDirty: false,
    }

    default:
      return state;
  }
}

function setMarks(state: State, action: Extract<Action, {type: 'marks/set'}>): State {
  const marks = { ...state.marks };

  for (const date of Object.keys(action.payload)) {
    const dayMarks = new Set(marks[date]);
    const newDayMarks = new Set(action.payload[date]);
    marks[date] = [...union(dayMarks, newDayMarks)];
  }

  return { ...state, marks };
}

function unsetMarks(state: State, action: Extract<Action, {type: 'marks/unset'}>): State {
  const marks = { ...state.marks };

  for (const date of Object.keys(action.payload)) {
    const dayMarks = new Set(marks[date]);
    const removeDayMarks = new Set(action.payload[date]);
    marks[date] = [...diff(dayMarks, removeDayMarks)];
  }

  for (const date of Object.keys(marks)) {
    if (!marks[date].length) {
      delete marks[date];
    }
  }

  return { ...state, marks };
}

function toggleMarks(state: State, action: Extract<Action, {type: 'marks/toggle'}>): State {
  const marks = { ...state.marks };

  for (const date of Object.keys(action.payload)) {
    const dayMarks = new Set(marks[date]);
    const removeDayMarks = new Set(action.payload[date]);
    marks[date] = [...symDiff(dayMarks, removeDayMarks)];
  }

  for (const date of Object.keys(marks)) {
    if (!marks[date].length) {
      delete marks[date];
    }
  }

  return { ...state, marks };
}
