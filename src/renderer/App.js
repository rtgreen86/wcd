import React from 'react';
import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Invoices from "./Routes/Invoices.jsx";
import Invoice from "./Routes/Invoice.jsx";
import MainScreen from './Routes/MainScreen.jsx';
import CalendarScreen from './Routes/CalendarScreen.jsx';
import ControlsScreen from './Routes/ControlsScreen.jsx';
import SettingsScreen from './Routes/SettingsScreen.jsx';
import LockScreen from './Routes/LockScreen.jsx';

export default function App() {
  return (
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
      <Route path="/" element={<MainScreen />}>
        <Route path="/" element={<CalendarScreen />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
