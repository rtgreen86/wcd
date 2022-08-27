import React from "react";
import ReactDOM from 'react-dom/client';
import { MemoryRouter } from "react-router-dom";
import App from './App';
import { ProvideAuth } from "./features/auth/ProvideAuth";

const container = document.getElementById('app');
const root = ReactDOM.createRoot(container);
root.render(
  <ProvideAuth>
    <MemoryRouter>
      <App />
    </MemoryRouter>
  </ProvideAuth>
);
