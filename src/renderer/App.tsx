import React, { createContext, useReducer, useState } from 'react';

import StateProvder from './components/state-provider';

import LockScreen from './components/screens/LockScreen';
import MainScreen from './views/main-screen';
import CalendarScreen from './views/calendar-screen';
import SettingsScreen from './views/settings-screen';

import Invoices from "./views/Invoices";
import Invoice from "./views/Invoice";

import RequireAuth from './components/RequireAuth';
import AuthProvider from './components/AuthProvider';

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
        <AuthProvider>
          <StateProvder>
            <MemoryRouter>

              <Routes>
                <Route path="/lock" element={<LockScreen />} />

                <Route path="/app" element={<RequireAuth><MainScreen /></RequireAuth>}>
                  <Route index element={<CalendarScreen />} />
                </Route>
                <Route path="/settings" element={<RequireAuth><SettingsScreen /></RequireAuth>} />
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
                {/* <Route path="/" element={} /> */}

                <Route path="*" element={<RequireAuth><Navigate to="/app" replace /></RequireAuth>} />
              </Routes>

            </MemoryRouter>
          </StateProvder>
        </AuthProvider>
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
}
