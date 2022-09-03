import React from 'react';
import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Home from './routes/Home.jsx';
import Lock from './routes/Lock.jsx';
import Expenses from "./routes/Expenses.jsx";
import Invoices from "./routes/Invoices.jsx";
import Invoice from "./routes/Invoice.jsx";
import Navigation from './Navigation';
import { useAuth } from './features/auth/ProvideAuth';
import PostsList from './features/posts/PostsList.js';
import { SinglePostPage } from './features/posts/SinglePostPage.js';

export default function App() {
  const { token, signout } = useAuth();

  const handleLogout = () => {
    signout();
  }

  return (
    <>
      <Navigation token={token} onLogout={handleLogout} />
      <Routes>
        {token ? (
          <>
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
              <Route path="posts" element={<PostsList />} />
              <Route path="posts/:postId" element={<SinglePostPage />} />
            </Route>
          </>
        ) : (
          <Route path="/" element={<Lock />} />
        )}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
