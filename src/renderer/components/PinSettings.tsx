import React, { useState, useEffect } from 'react';
import * as Api from '../api';
import PinInput from './PinInput';

export default function PinSettings() {
  const pinSize = 4;

  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [isPinExist, setPinExist] = useState(false);
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
    return <span>PIN exists.</span>;
  }

  const isSubmitDisabled = newPin.length !== pinSize;

  const handleSetPinCode = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setNewPin('');
    try {
      const result = await Api.setPin(null, newPin);
      setPinExist(result);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form  onSubmit={handleSetPinCode} >
      <p>
        PIN code is not set. Set PIN code to protect application data.<br />
        <label>Enter new PIN code: <PinInput name="pin-code" size={pinSize} onChange={(value) => setNewPin(value)} /></label>
      </p>
      <p><input className="btn btn-default" type="submit" disabled={isSubmitDisabled} /></p>
    </form>
  );
}
