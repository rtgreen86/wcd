import React, { useReducer, ReactNode } from "react";
import reducer from "../../reducers";
import { DispatchContext, StateContext } from "../../contexts/state-context";
import { initState } from '../../state'

type StorageProps = {
  children: ReactNode
};

export default function StateProvider({ children }: StorageProps) {
  const [state, dispatch] = useReducer(reducer, {}, initState);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}
