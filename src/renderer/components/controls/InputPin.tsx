import { useState, FormEvent, FocusEvent, forwardRef } from 'react';

export interface InputPinProps {
  autoFocus?: boolean;
  id?: string;
  className?: string;
  name?: string;
  maxLength?: number;
  value?: string;
  pattern?: string;
  readOnly?: boolean;
  disabled?: boolean;
  onChange?: (value: string) => void;
  onFocus?: (event: FocusEvent<HTMLInputElement, Element>) => void;
};

export const InputPin = forwardRef<HTMLInputElement, InputPinProps>(({
  value,
  onChange = () => undefined,
  onFocus = () => undefined,
  ...restProps
}, forwardedRef) => {
  const [internalValue, setInternalValue] = useState('');
  const acutalValue = value === undefined ? internalValue : value;

  const handleChange = (e: FormEvent) => {
    const value = (e.target as HTMLInputElement).value;
    const digitRx = /\d/;
    const filteredValue = (value || '').split('').filter(char => digitRx.test(char)).join('');
    setInternalValue(filteredValue);
    onChange(filteredValue);
  };

  return <input ref={forwardedRef} type="password" value={acutalValue} autoComplete="off" onChange={handleChange} onFocus={onFocus} {...restProps}></input>
});

export default InputPin;
