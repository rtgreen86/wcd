import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks';
import LoginForm from '../LoginForm';
import AuthenticateModal from '../modals/AuthenticateModal'

import {Modal} from 'bootstrap';

import './LockScreen.css';

export default function LockScreen() {
  const { token, signin } = useAuth();
  const [ pin, setPin ] = useState('');

  useEffect(() => {
    const myModalAlternative = new Modal('#authenticate-modal');
    // myModalAlternative.show();
  }, []);

  const handlePinEntered = () => {
    signin(pin);
  };

  if (token) {
    return <Navigate to="/" replace />;
  }

  return (
    <section className="login-form-container">
      <LoginForm autoFocus onPinEntered={ handlePinEntered } />
      <AuthenticateModal id="authenticate-modal" />
    </section>
  );
}
