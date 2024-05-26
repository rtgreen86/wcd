import React, { useState, useEffect } from 'react';
import * as Api from '../api';
import PinInput from './PinInput';
import ModalButton from './ModalButton';
import { useFormModal } from '../hooks/FormModalHooks';

export default function PinSettings() {
  const pinSize = 4;

  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [isPinExist, setPinExist] = useState(false);
  const [oldPin, setOldPin] = useState('');

  useEffect(() => {
    Api.isPinExist()
      .then((_isPinExist: boolean) => setPinExist(_isPinExist))
      .catch((error: Error) => setError(error))
      .then(() => setLoading(false));
  }, []);

  const modal = useFormModal('set-pin-modal');

  modal.onApply(async (event: CustomEvent<FormData>) => {
    const pin = event.detail.get('pin');

    if (typeof pin === 'string') {
      setLoading(true);
      try {
        const result = await Api.setPin(null, pin);
        setPinExist(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
  });

  if (error) {
    return <span>{error.message}</span>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  let message = 'You can protect your application data by settings PIN code.';

  if (isPinExist) {
    const handleRemovePin = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setLoading(true);
      setOldPin('');
      try {
        const result = await Api.setPin(oldPin, null);
        setPinExist(!result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    return (
      <form onSubmit={handleRemovePin} >
        <p>
          Entrer your current PIN code:<br />
          <label>Current PIN: <PinInput name="pin-code" maxLength={pinSize} onChange={value => setOldPin(value)} /></label>
        </p>
        <p><input className='btn' type="submit" value="Delete" /></p>
      </form>
    );
  }

  return (
    <section>
      <h5>PIN code</h5>

      <p>{message}</p>

      {
        isPinExist
          ? <ModalButton buttonStyle='danger' modalAction="modal-toggle" modalTarget="#delete-pin-modal">Delete PIN</ModalButton>
          : <ModalButton buttonStyle="outline-dark" modalAction="modal-toggle" modalTarget="#set-pin-modal">Set PIN</ModalButton>
      }
    </section>
  );
}
