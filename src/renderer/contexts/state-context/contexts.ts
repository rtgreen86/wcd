import { createContext, Dispatch } from 'react';
import { State, initState } from '../../state';
import { Action } from '../../actions';

export const StateContext = createContext<State>(initState());

export const DispatchContext = createContext<Dispatch<Action>>(() => {/* empty */});
