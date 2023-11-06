import {Marks} from '../state';

export const yearIncrement = () => ({
  type: 'year/increment' as const
});

export const yearDecrement = () => ({
  type: 'year/decrement' as const
});

export const marksLoaded = (payload: Marks) => ({
  type: 'marks/loaded' as const,
  payload
});

export const marksSet = (payload: Marks) => ({
  type: 'marks/set' as const,
  payload
});

export const marksUnset = (payload: Marks) => ({
  type: 'marks/unset' as const,
  payload,
});

export const marksToggle = (payload: Marks) => ({
  type: 'marks/toggle' as const,
  payload,
});
