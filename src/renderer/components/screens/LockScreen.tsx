import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks';
import LoginForm from '../LoginForm';

import './LockScreen.css';

export default function LockScreen() {
  const { token } = useAuth();

  const handlePinEntered = () => { };

  if (token) {
    return <Navigate to="/" replace />;
  }

  return (
    <section className="login-form-container">
      <LoginForm autoFocus onLogin={ handlePinEntered } />
    </section>
  );
}
