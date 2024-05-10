import React, { useState, useEffect } from 'react';
import { Authenticator } from '../api';
import Button from './controls/Button';
import { useModal } from '../hooks/useModal';

export default function PinSettings() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [isPinExist, setPinExist] = useState(false);

  const setPinModal = useModal('set-pin-modal');
  const deletePinModal = useModal('delete-pin-modal');

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
        const result = await Authenticator.setPin('', pin);
        setPinExist(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  });

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
      { isSetPinVisible && <Button buttonStyle="outline-dark" action="toggle-modal" modalTarget="#set-pin-modal">Set PIN</Button> }
      { isDeletePinVisible && <Button buttonStyle="danger" action="toggle-modal" modalTarget="#delete-pin-modal">Delete PIN</Button> }
    </section>
  );
}
