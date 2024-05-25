import React, { useState, FormEvent } from 'react';

type Props = {
  id?: string,
  className?: string,
  name?: string,
  maxLength?: number,
  value?: string,
  onChange?: (value: string) => void,
};

const noop = () => {};

export default function InputPin({
  id = '',
  className = '',
  name = '',
  maxLength,
  value,
  onChange = noop,
}: Props) {
  const [internalValue, setInternalValue] = useState('');
  const acutalValue = value === undefined ? internalValue : value;

  const handleChange = (e: FormEvent) => {
    const value = (e.target as HTMLInputElement).value;
    const digitRx = /\d/;
    const filteredValue = (value || '').split('').filter(char => digitRx.test(char)).join('');
    setInternalValue(filteredValue);
    onChange(filteredValue);
  };

  return <input id={id} className={className} type="password" name={name} maxLength={maxLength} value={acutalValue} onChange={handleChange}></input>
}
