import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import LoginForm from './LoginForm.jsx';

import './LockScreen.css';

export default function LockScreen() {
  const navigate = useNavigate();
  const [pin, setPin] = useState('');

  const handlePinEntered = () => {
    navigate('/');
  }

  return (
    <section className="login-form-container">
      <LoginForm value={pin} autoFocus onChangeValue={setPin} onPinEntered={handlePinEntered} />
    </section>
  );
}
