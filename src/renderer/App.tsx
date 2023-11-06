import React, { createContext, useReducer } from 'react';
import StateProvder from './components/state-provider';
import Invoices from "./views/Invoices";
import Invoice from "./views/Invoice";
import CalendarScreen from './views/calendar-screen';
import ControlsScreen from './views/ControlsScreen';
import SettingsScreen from './views/SettingsScreen';
import LockScreen from './views/LockScreen';

import {
  Routes,
  Route,
  Navigate,
  MemoryRouter
} from "react-router-dom";

// State and Reducer

type State = number;

type ActionIncrement = { type: 'increment' };

type ActionDecrement = { type: 'decrement' };

type Action = ActionIncrement | ActionDecrement;

const initialArg: State = 0;

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'increment': return state + 1;
    case 'decrement': return state - 1;
    default: return state;
  }
}

// Context

export const StateContext = createContext(0);

const f: React.Dispatch<Action> = () => {/* empty */ };

export const DispatchContext = createContext(f);

// Usage from Controls and Settings Screens

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialArg);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        <StateProvder>
          <MemoryRouter>

            <Routes>
              <Route path="/lock" element={<LockScreen />} />
              <Route path="/controls" element={<ControlsScreen />} />
              <Route path="/settings" element={<SettingsScreen />} />
              <Route path="invoices" element={<Invoices />}>
                <Route path=":invoiceId" element={<Invoice />} />
                <Route
                  index
                  element={
                    <main style={{ padding: "1rem" }}>
                      <p>Select an invoice</p>
                    </main>
                  }
                />
              </Route>
              <Route path="/" element={<CalendarScreen />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>

          </MemoryRouter>
        </StateProvder>
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
}
