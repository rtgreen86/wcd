import React, { useState, FormEvent } from 'react';

type Props = {
  name?: string,
  maxLength?: number,
  value?: string,
  disabled?: boolean,
  onChange?: (value: string) => void;
  onPinEntried?: (value: string) => void;
};

const noop = () => {};

export default function PinInput({
  name = '',
  maxLength = 4,
  value,
  disabled = false,
  onChange = noop,
  onPinEntried = noop,
}: Props) {
  const [entriedValue, setEntriedValue] = useState('');

  const actualValue = value === undefined ? entriedValue : value;

  const handleChange = (e: FormEvent) => {
    const currentValue = (e.target as HTMLInputElement).value;
    if (!/^\d*$/.test(currentValue)) return;
    if (currentValue.length > maxLength) return;
    setEntriedValue(currentValue);
    onChange(currentValue);
    if (actualValue.length < maxLength && currentValue.length === maxLength) onPinEntried(currentValue);
  };

  return <input type="password" name={name} maxLength={maxLength} value={actualValue} disabled={disabled} onChange={handleChange}></input>;
}
