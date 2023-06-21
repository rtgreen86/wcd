import React from 'react';
import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Invoices from "./routes/Invoices";
import Invoice from "./routes/Invoice";
import CalendarScreen from './routes/CalendarScreen';
import ControlsScreen from './routes/ControlsScreen';
import SettingsScreen from './routes/SettingsScreen';
import LockScreen from './routes/LockScreen';

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
      <Route path="/" element={<CalendarScreen />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
