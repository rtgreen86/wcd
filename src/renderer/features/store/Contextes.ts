import { createContext, Dispatch } from 'react';
import { State, initState } from './State';
import { Action } from './Action';

export const StateContext = createContext<State>(initState());

export const DispatchContext = createContext<Dispatch<Action>>(() => {/* empty */});
