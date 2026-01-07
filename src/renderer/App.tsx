import React from 'react';

import StateProvder from './components/state-provider';

import LockScreen from './components/screens/LockScreen';
import MainScreen from './components/screens/MainScreen';
import CalendarScreen from './components/screens/CalendarScreen';
import SettingsScreen from './components/screens/SettingsScreen';
import InitScreen from '@components/screens/InitScreen';

import RequireAuth from './components/RequireAuth';
import AuthProvider from './components/AuthProvider';

import {
  Routes,
  Route,
  Navigate,
  MemoryRouter
} from "react-router-dom";

export default function App() {
  return (
    <AuthProvider>
      <StateProvder>
        <MemoryRouter>

          <Routes>
            <Route path="/lock" element={<LockScreen />} />

            <Route path="/app" element={<RequireAuth><MainScreen /></RequireAuth>}>
              <Route index element={<CalendarScreen />} />
            </Route>
            <Route path="/settings" element={<RequireAuth><SettingsScreen /></RequireAuth>} />
            <Route path="*" element={<InitScreen />} />
          </Routes>

        </MemoryRouter>
      </StateProvder>
    </AuthProvider>
  );
}
