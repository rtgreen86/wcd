import React, { useState } from 'react';
import PinInput from './PinInput';
import * as Api from '../api';

type Props = {
  pinSize: number,
  disabled?: boolean,
  message?: string,
  onSubmit?: (pin: string) => void;
};

export default function PinSetForm({
  pinSize,
  disabled = false,
  message = '',
  onSubmit = () => {},
}: Props) {
  const [pin1, setPin1] = useState('');
  const [pin2, setPin2] = useState('');

  const isSubmitDisabled = disabled || pin1.length !== pinSize || pin1 !== pin2;

  let actualMessage = `PIN should be 4 digit length.`;

  if (pin1.length === pinSize && pin2.length === 0) {
    actualMessage = 'Retype PIN in second field.';
  }

  if (pin2.length === 4 && pin1 !== pin2) {
    actualMessage = 'PINs in both fields should be equal.';
  }

  if (message) {
    actualMessage = message;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(pin1);
  }

  return (
    <form onSubmit={handleSubmit} >
      <p>
        PIN code is not set. Set PIN code to protect application data.<br />
        <label>Enter new PIN code: <PinInput name="pin-code" maxLength={pinSize} disabled={disabled} onChange={value => setPin1(value)} /></label>
        <label>Enter new PIN code: <PinInput name="pin-code" maxLength={pinSize} disabled={disabled} onChange={value => setPin2(value)} /></label>
      </p>
      <p>{actualMessage}</p>
      <p><input className="btn btn-default" type="submit" disabled={isSubmitDisabled} /></p>
    </form>
  );
}