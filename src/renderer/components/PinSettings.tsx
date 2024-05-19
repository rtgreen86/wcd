import React, { useState, useEffect } from 'react';
import * as Api from '../api';
import PinInput from './PinInput';
import PinSetForm from './PinSetForm';

export default function PinSettings() {
  const pinSize = 4;

  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [isPinExist, setPinExist] = useState(false);
  const [oldPin, setOldPin] = useState('');
  const [newPin, setNewPin] = useState('');

  useEffect(() => {
    Api.isPinExist()
      .then((_isPinExist: boolean) => setPinExist(_isPinExist))
      .catch((error: Error) => setError(error))
      .then(() => setLoading(false));
  }, []);

  if (error) {
    return <span>{error.message}</span>;
  }

  if (isLoading) {
    return <span>loading...</span>;
  }

  if (isPinExist) {
    const handleRemovePin = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setLoading(true);
      setOldPin('');
      setNewPin('');
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

  const handleSetPinSubmit = async (pin: string) => {
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

  const isDisabled = isLoading || Boolean(error);

  const actualMessage = error ? error.message : '';

  return <PinSetForm pinSize={pinSize} message={actualMessage} disabled={isDisabled} onSubmit={handleSetPinSubmit} />;
}
