import React from "react";
import ReactDOM from 'react-dom/client';
import { MemoryRouter, Routes, Route } from "react-router-dom";
import App from './App';
import Expenses from "./routes/Expenses.jsx";
import Invoices from "./routes/Invoices.jsx";


const container = document.getElementById('app');
const root = ReactDOM.createRoot(container);

// TODO: https://reactrouter.com/docs/en/v6/getting-started/tutorial#listing-the-invoices

root.render(
  <MemoryRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="expenses" element={<Expenses />} />
        <Route path="invoices" element={<Invoices />} />
      </Route>
    </Routes>
  </MemoryRouter>
);
