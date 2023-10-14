import React, { useReducer, ReactNode } from "react";
import reducer from "./reducer";
import { initState } from "./State";
import { DispatchContext, StateContext } from "./Contextes";

type StorageProps = {
  children: ReactNode
};

export default function Provider({ children }: StorageProps) {
  const [state, dispatch] = useReducer(reducer, {}, initState);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}
