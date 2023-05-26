import React from 'react';
import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Home from './routes/Home.jsx';
// import Lock from './routes/Lock.jsx';
import Expenses from "./routes/Expenses.jsx";
import Invoices from "./routes/Invoices.jsx";
import Invoice from "./routes/Invoice.jsx";
// import Navigation from './Navigation';
// import { useAuth } from './features/auth/ProvideAuth';
import PostsList from './features/posts/PostsList.js';
import { SinglePostPage } from './features/posts/SinglePostPage.js';
import { EditPostForm } from './features/posts/EditPostsForm.js';
import CalendarScreen from './routes/CalendarScreen.jsx';

import MainScreen from './components/MainScreen.jsx';
import HomeScreen from './components/HomeScreen.jsx';
import ControlsScreen from './components/ControlsScreen.jsx';

export default function App() {
  // const { token, signout } = useAuth();

  // const handleLogout = () => {
  //   signout();
  // }

  // const nav = <Navigation token={token} onLogout={handleLogout} />;

  return (
    <Routes>
      <Route path="old" element={<Home />}>
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
        <Route path="calendar" element={<CalendarScreen />} />
        <Route path="posts" element={<PostsList />} />
        <Route path="posts/:postId" element={<SinglePostPage />} />
        <Route path="editPost/:postId" element={<EditPostForm />} />
      </Route>
      <Route path="/controls" element={<ControlsScreen />} />
      <Route path="/" element={<MainScreen />}>
        <Route path="/" element={<HomeScreen />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
