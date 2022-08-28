import React from 'react';
import ReactDOM from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import { ProvideAuth } from './features/auth/ProvideAuth';
import store from './app/store';

// TODO: https://redux.js.org/introduction/why-rtk-is-redux-today

const container = document.getElementById('app');
const root = ReactDOM.createRoot(container);
root.render(
  <Provider store={store}>
    <ProvideAuth>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </ProvideAuth>
  </Provider>
);
