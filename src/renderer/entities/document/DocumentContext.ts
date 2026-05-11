import { createContext } from 'react';
import { State, Context } from './types';

export const defaultState: () => State = () => ({
  marks: {},
  isLoading: true,
});

export const DocumentContext = createContext<Context>({
  state: defaultState(),
  dispatch: () => { }
});
