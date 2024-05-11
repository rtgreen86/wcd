import React, { useState, useEffect } from 'react';
import * as Api from '../api';
import PinInput from './PinInput';

export default function PinSettings() {
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [isPinExist, setPinExist] = useState(false);

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

  return (
    <form>
      <div>PIN code is not set. Set PIN code to protect application data.</div>
      <div><label>Enter new PIN code: <PinInput /></label></div>
      <div><input type="submit" onSubmit={ (event) => event.preventDefault() } /></div>
    </form>
  );
}
