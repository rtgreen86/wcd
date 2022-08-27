import React from 'react';
import {
  Routes,
  Route,
  useNavigate,
  Navigate
} from "react-router-dom";
import Home from './routes/Home.jsx';
import Lock from './routes/Lock.jsx';
import NoMatch from './routes/NoMatch.jsx';
import Expenses from "./routes/Expenses.jsx";
import Invoices from "./routes/Invoices.jsx";
import Invoice from "./routes/Invoice.jsx";
import Navigation from './Navigation';
import { useAuth } from './features/auth/auth';

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  if (!token) {
    return <Navigate to="/lock" replace />;
  }
  return children;
};

export default function App() {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    await auth.signin();
    navigate('/home');
  }

  const handleLogout = () => {
    auth.signout();
  }

  return (
    <>
      <Navigation token={auth.token} onLogout={handleLogout} />
      <Routes>
        <Route path="lock" element={<Lock token={auth.token} onLogin={handleLogin} />} />
        {auth.token && (<>
          <Route path="home" element={<ProtectedRoute><Home /></ProtectedRoute>}>
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
          </Route>
          <Route index element={<ProtectedRoute><Home /></ProtectedRoute>} />
        </>)}
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
}
