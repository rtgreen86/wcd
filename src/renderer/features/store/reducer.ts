import { Action } from "./Action";
import { State } from "./State";

export default function reducer(state: State, action: Action): State {
  switch(action.type) {
    case "year/increment": return {
      ...state,
      year: state.year + 1,
    };

    case "year/decrement": return {
      ...state,
      year: state.year - 1,
    };

    case "marks/loaded":
    case "marks/set":
    case "marks/unset":
    case "marks/toggle":
    default:
      return state;
  }
}

