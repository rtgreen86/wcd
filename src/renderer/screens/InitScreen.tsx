import './InitScreen.css';

import { useState } from 'react';
import { Navigate } from "react-router-dom";
import i18n, { t } from '@shared/translations';
import { init } from '../api';
import { Spinner } from '../components/Spinner';

export default function InitScreen() {
  const initialized = useState(false);
  const [message, setMessage] = useState('');




  const [isSuccess, setSuccess] = useState(false);

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
    const systemLocale = await electronAPI.getSystemLocale();
    i18n.changeLanguage(systemLocale);
    setMessage(t('Initializing the application...'));

    // TODO: Initialize application





    // const result = await init();
    // if (!result) {
    //   handleError('Main process returns empty result.');
    //   return;
    // }
    // if (result.status === 'fail') {
    //   handleError(result.payload);
    //   return;
    // }
    // handleSuccess();
  };

  useState(() => { initAsync(); });

  if (isSuccess) {
    return <Navigate to="/app" replace />;
  }

  return (
    <main id="init-screen">
      <Spinner stop={!initialized}/>
      <div className="message">{message}</div>
      {/* <div className="spacer"></div>
      <div className="message">{message}</div>
      <div className="spacer"></div> */}
    </main>
  );
}
