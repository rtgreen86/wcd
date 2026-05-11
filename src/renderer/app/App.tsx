import StateProvder from '../components/state-provider';

import LockScreen from '../components/screens/LockScreen';
import CalendarScreen from '../components/screens/CalendarScreen';
import SettingsScreen from '../components/screens/SettingsScreen';

import RequireAuth from '../components/RequireAuth';
import AuthProvider from '../components/AuthProvider';

import {
  Routes,
  Route,
  Navigate,
  MemoryRouter
} from "react-router-dom";

import InitProvider from './providers/InitProvider';


import MainScreen from '../screens/MainScreen';

export default function App() {
  return (
    <InitProvider>
      <AuthProvider>
        {/* <StateProvder> */}
        <MemoryRouter>
          <Routes>
            {/* <Route path="/lock" element={<LockScreen />} /> */}
            {/* <Route path="/app" element={<RequireAuth><MainScreen /></RequireAuth>}> */}
            {/* <Route index element={<CalendarScreen />} /> */}
            {/* </Route> */}
            {/* <Route path="/settings" element={<RequireAuth><SettingsScreen /></RequireAuth>} /> */}
            {/* <Route path="*" element={<InitScreen />} /> */}
            <Route path="*" element={<MainScreen />} />
          </Routes>
        </MemoryRouter>
        {/* </StateProvder> */}
      </AuthProvider>
    </InitProvider>
  );
}
