import { useContext } from "react";
import { DispatchContext, StateContext } from "./Contextes";

export const useStore = () => useContext(StateContext);

export const useDispatch = () => useContext(DispatchContext);
