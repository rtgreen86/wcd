import React from 'react';
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Home from './routes/Home.jsx';
import Lock from './routes/Lock.jsx';
import NoMatch from './routes/NoMatch.jsx';
import Expenses from "./routes/Expenses.jsx";
import Invoices from "./routes/Invoices.jsx";
import Invoice from "./routes/Invoice.jsx";
import { ProvideAuth } from "./features/auth/auth";

export default function App() {
  return (
    <ProvideAuth>
      <MemoryRouter>
        <Routes>
          <Route path="lock" element={<Lock />} />
          <Route path="/" element={<Home />}>
            <Route path="expenses" element={<Expenses />} />
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

            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </MemoryRouter>
    </ProvideAuth>
  );
}
