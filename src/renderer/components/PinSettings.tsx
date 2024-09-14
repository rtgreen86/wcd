import React, { useState, useEffect, useRef } from 'react';
import { Authenticator } from '../api';
import Button from './controls/Button';
import { useModal } from '../hooks/useModal';
import ModalButton from './controls/ModalButton';

export default function PinSettings() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [isPinExist, setPinExist] = useState(false);

  const setPinModal = useModal('set-pin-modal');
  const deletePinModal = useModal('delete-pin-modal');

  const ref = useRef(null);

  useEffect(() => {
    Authenticator.isPinExist()
      .then((_isPinExist: boolean) => setPinExist(_isPinExist))
      .catch((error: Error) => setError(error.message))
      .then(() => setLoading(false));
  }, []);

  setPinModal.onApply(async (event: CustomEvent<FormData>) => {
    const pin = event.detail.get('pin');

    if (typeof pin === 'string') {
      setLoading(true);
      try {
        // Debugging
        // TODO: enable this code
        // const result = await Authenticator.setPin('', pin);
        // setPinExist(result);

        console.log('PIN setted.');
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  });

  const handleApply = (event: any) => {
    console.log('PinSettings: handleApply()', event);
  };

  useEffect(() => {
    console.log('subscribe');
    document.addEventListener('submit.modal', handleApply);
    return () => {
      document.removeEventListener('submit.modal', handleApply);
    };
  });

  const handleApply2 = (event: any) => {
    console.log('PinSettings: handleApply2()', event);
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener('submit.modal', handleApply2);
    }
    return () => {
      if (ref.current) {
        ref.current.removeEventListener('submit.modal', handleApply2);
      }
    }
  })

  deletePinModal.onApply(async (event: CustomEvent<FormData>) => {
    const pin = event.detail.get('pin');

    if (typeof pin === 'string') {
      setLoading(true);
      try {
        const result = await Authenticator.removePin(pin);

        if (!result) {
          setError('Incorrect PIN code.')
        }

        setPinExist(!result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  });

  let message = 'You can protect your application data by settings PIN code.';
  if (isLoading) message = 'Processing...';
  if (error) message = error;

  const isSetPinVisible = !isLoading && !error && !isPinExist;
  const isDeletePinVisible = !isLoading && !error && isPinExist;

  return (
    <section>
      <h5>PIN code</h5>
      <p>{ message }</p>
      { isSetPinVisible && <ModalButton buttonStyle="outline-dark" target="#set-pin-modal">Set PIN</ModalButton> }
      { isDeletePinVisible && <ModalButton buttonStyle="danger" target="#delete-pin-modal">Delete PIN</ModalButton> }
    </section>
  );
}
