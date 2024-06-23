import React, { useState, FormEvent, FocusEvent } from 'react';

type Props = {
  autoFocus?: boolean,
  id?: string,
  className?: string,
  name?: string,
  maxLength?: number,
  value?: string,
  pattern?: string,
  readOnly?: boolean,
  onChange?: (value: string) => void,
  onFocus?: (event: FocusEvent<HTMLInputElement, Element>) => void
};

const noop = () => {};

export default function InputPin({
  value,
  onChange = noop,
  onFocus = noop,
  ...rest
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

  return <input type="password" value={acutalValue} autoComplete="off" onChange={handleChange} onFocus={onFocus} {...rest}></input>
}
