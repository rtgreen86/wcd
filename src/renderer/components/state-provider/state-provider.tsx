import React, { useReducer, ReactNode } from "react";
import reducer from "../../reducers";
import { initState, DispatchContext, StateContext } from "../../contexts/state-context";

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
