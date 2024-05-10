import './LockScreen.css';

import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks';
import LoginForm from '../components/login-form';

export default function LockScreen() {
  const { token, signin } = useAuth();
  const [ pin, setPin ] = useState('');

  const handlePinEntered = () => {
    signin(pin);
  };

  if (token) {
    return <Navigate to="/" replace />;
  }

  return (
    <section className="login-form-container">
      <LoginForm value={ pin } autoFocus onChangeValue={ setPin } onPinEntered={ handlePinEntered } />
    </section>
  );
}
