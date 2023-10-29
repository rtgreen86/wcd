import { useContext } from "react";
import { DispatchContext, StateContext } from "../contexts/state-context";

export const useStore = () => useContext(StateContext);

export const useDispatch = () => useContext(DispatchContext);
