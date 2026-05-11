import { Document, Marks, Action } from './types';

export function reducer(state: Document, action: Action): Document {
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
