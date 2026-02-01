import './InitScreen.css';

import { useState } from 'react';
import { Navigate } from "react-router-dom";
import { init } from '../../api';

export default function InitScreen() {
  const [isSuccess, setSuccess] = useState(false);
  const [message, setMessage] = useState('Starting...');

  const handleError = (error: unknown) => {
    if (error instanceof Error) setMessage(`Initialization failed. ${error.message}`);
    else if (typeof error === 'string') setMessage(`Initialization failed. ${error}`);
    else setMessage('Initialization failed.');
  };

  const handleSuccess = () => {
    setSuccess(true);
    setMessage('');
  };

  const initAsync = async () => {
    const result = await init();
    if (!result) {
      handleError('Main process returns empty result.');
      return;
    }
    if (result.status === 'fail') {
      handleError(result.payload);
      return;
    }
    handleSuccess();
  };

  useState(() => { initAsync(); });

  if (isSuccess) {
    return <Navigate to="/app" replace />;
  }

  return (
    <main id="init-screen">
      <div className="spacer"></div>
      <div className="message">{message}</div>
      <div className="spacer"></div>
    </main>
  );
}
