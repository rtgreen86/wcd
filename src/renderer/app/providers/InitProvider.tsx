import './InitProvider.css';

import { t } from '@shared/translations';
import React, { useEffect, useState } from 'react';
import { init } from '../../shared/api/init';
import { Spinner } from '../../shared/widgets/Spinner';

export default function InitProvider({ children }: { children: React.ReactNode }) {
  const [success, setSuccess] = useState(false);
  const [inProcess, setInProcess] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const startInit = async () => {
      setMessage(t('Initializing the application...'));

      try {
        const result = await init();

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
