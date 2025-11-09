import { useState, FormEvent, useRef, useEffect } from 'react';
import './InputPIN.css';

const noop = () => {};

export const InputPIN = ({
  name = '',
  maxLength = 4,
  value,
  disabled = false,
  forceFocus = false,
  onChange = noop,
  onPinEntered = noop,
}: {
  name?: string,
  maxLength?: number,
  value?: string,
  disabled?: boolean,
  forceFocus?: boolean,
  onChange?: (value: string) => void;
  onPinEntered?: (value: string) => void;
}) => {
  const ref1 = useRef<HTMLInputElement>(null);
  const [entriedValue, setEntriedValue] = useState('');

  const actualValue = value === undefined ? entriedValue : value;

  const handleChange = (e: FormEvent) => {
    const currentValue = (e.target as HTMLInputElement).value;
    if (!/^\d*$/.test(currentValue)) return;
    if (currentValue.length > maxLength) return;
    setEntriedValue(currentValue);
    onChange(currentValue);
    if (actualValue.length < maxLength && currentValue.length === maxLength) onPinEntered(currentValue);
  };

  useEffect(() => {
    if (forceFocus && !disabled) ref1.current?.focus();
  }, [forceFocus, disabled]);

  return (<input ref={ref1} className="input-pin" type="password" name={name} maxLength={maxLength} value={actualValue} disabled={disabled} onChange={handleChange} autoComplete="off"></input>);
};
