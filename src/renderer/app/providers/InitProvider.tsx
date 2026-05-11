import './InitProvider.css';

import i18n from 'i18next';
import React, { useEffect, useState } from 'react';
import { initApp, initLocale } from '../../shared/api/inits';
import { Spinner } from '../../shared/widgets/Spinner';

export default function InitProvider({ children }: { children: React.ReactNode }) {
  const [inProcess, setInProcess] = useState(true);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const startInit = async () => {
      try {
        const locale = await initLocale();

        setMessage(i18n.t('Initializing the application...'));
        const result = await initApp({ locale });

        if (result.status === 'fail') {
          setSuccess(false);
          setInProcess(false);
          setMessage(result.payload.message);
          return;
        }

        setSuccess(true);
        setInProcess(false);
        setMessage(i18n.t('Done'));
      } catch (error) {
        setSuccess(false);
        setInProcess(false);
        setMessage(String(error));
      }
    };
    startInit();
  }, []);

  if (!success) {
    return (
      <main id="init-screen">
        <Spinner stop={!inProcess} />
        <div className="message">{message}</div>
      </main>
    );
  }

  return children;
}
