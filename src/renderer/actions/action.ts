import {Marks} from '../state';

type YearIncrement = { type: 'year/increment' };

type YearDecrement = { type: 'year/decrement' };

type MarksLoaded = { type: 'marks/loaded', payload: Marks };

type MarksSaved = { type: 'marks/saved' };

type MarksSet = { type: 'marks/set', payload: Marks };

type MarksUnset = { type: 'marks/unset', payload: Marks };

type MarksToggle = { type: 'marks/toggle', payload: Marks };

export type Action = YearIncrement | YearDecrement | MarksLoaded | MarksSaved | MarksSet | MarksUnset | MarksToggle;

export type ActionType = Action["type"];
