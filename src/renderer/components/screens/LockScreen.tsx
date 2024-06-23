import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks';
import LoginForm from '../LoginForm';
import AuthenticateModal from '../modals/AuthenticateModal'

import {Modal} from 'bootstrap';

import './LockScreen.css';

export default function LockScreen() {
  const { token } = useAuth();

  useEffect(() => {
    const myModalAlternative = new Modal('#authenticate-modal');
    // myModalAlternative.show();
  }, []);

  const handlePinEntered = () => { };

  if (token) {
    return <Navigate to="/" replace />;
  }

  return (
    <section className="login-form-container">
      <LoginForm autoFocus onLogin={ handlePinEntered } />
      <AuthenticateModal id="authenticate-modal" />
    </section>
  );
}
