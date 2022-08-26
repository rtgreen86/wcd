import React from "react";
import ReactDOM from 'react-dom/client';
import { MemoryRouter, Routes, Route } from "react-router-dom";
import App from './App';
import Expenses from "./routes/Expenses.jsx";
import Invoices from "./routes/Invoices.jsx";
import Invoice from "./routes/Invoice.jsx";


const container = document.getElementById('app');
const root = ReactDOM.createRoot(container);

root.render(
  <MemoryRouter>
    <Routes>
      <Route path="/" element={<App />}>
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
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Route>
    </Routes>
  </MemoryRouter>
);
