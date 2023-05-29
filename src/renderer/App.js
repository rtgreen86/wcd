import React from 'react';
import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Home from './routes/Home.jsx';
import Invoices from "./routes/Invoices.jsx";
import Invoice from "./routes/Invoice.jsx";
import MainScreen from './components/MainScreen.jsx';
import CalendarScreen from './components/CalendarScreen.jsx';
import ControlsScreen from './components/ControlsScreen.jsx';
import SettingsScreen from './components/SettingsScreen.jsx';
import LockScreen from './components/LockScreen.jsx';

export default function App() {
  // const { token, signout } = useAuth();

  // const handleLogout = () => {
  //   signout();
  // }

  // const nav = <Navigation token={token} onLogout={handleLogout} />;

  return (
    <Routes>
      <Route path="old" element={<Home />}>


      </Route>
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
      <Route path="/" element={<MainScreen />}>
        <Route path="/" element={<CalendarScreen />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
