import { useState, FormEvent, forwardRef } from 'react';
import './InputPIN.css';

type InputPINProps = {
  name?: string,
  maxLength?: number,
  value?: string,
  disabled?: boolean,
  onChange?: (value: string) => void;
  onPinEntried?: (value: string) => void;
};

export const InputPIN = forwardRef<HTMLInputElement, InputPINProps>(({
  name = '',
  maxLength = 4,
  value,
  disabled = false,
  onChange = () => undefined,
  onPinEntried = () => undefined,
}: InputPINProps, ref) => {
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

  return (<input ref={ref} className="input-pin" type="password" name={name} maxLength={maxLength} value={actualValue} disabled={disabled} onChange={handleChange} autoComplete="off"></input>);
})
