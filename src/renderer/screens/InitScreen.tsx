import './InitScreen.css';

import { useState } from 'react';
import { Navigate } from "react-router-dom";
import i18n, { t } from '@shared/translations';
import { init } from '../api';
import { Spinner } from '../components/Spinner';

export default function InitScreen() {
  const [inProcess, setInProcess] = useState(true);
  const [message, setMessage] = useState('');
  const [isSuccess, setSuccess] = useState(false);

  const initAsync = async () => {
    const systemLocale = await electronAPI.getSystemLocale();
    await i18n.changeLanguage(systemLocale);
    setMessage(t('Initializing the application...'));

    try {
      const result = await init({ locale: systemLocale });

      if (result.status === 'success') {
        setSuccess(true);
        setInProcess(false);
        setMessage('');
        return;
      }

      setSuccess(false);
      setInProcess(false);
      setMessage(result.payload.message);
    } catch (error) {
      setSuccess(false);
      setInProcess(false);
      setMessage(String(error));
    }
  };

  useState(() => { initAsync(); });

  if (isSuccess) {
    return <Navigate to="/app" replace />;
  }

  return (
    <main id="init-screen">
      <Spinner stop={!inProcess} />
      <div className="message">{message}</div>
    </main>
  );
}
