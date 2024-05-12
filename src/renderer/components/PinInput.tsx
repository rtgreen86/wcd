import React, { useState, FormEvent } from 'react';

type Props = {
  name?: string,
  size?: number
  onChange?: (value: string) => void;
};

export default function PinInput({
  name = '',
  size = 4,
  onChange = () => {},
}: Props) {
  const [value, setValue] = useState('');

  const handleChange = (e: FormEvent) => {
    const _value = (e.target as HTMLInputElement).value;
    if (!/^\d*$/.test(_value)) {
      return;
    }
    if (_value.length > size) {
      return;
    }
    setValue(_value);
    onChange(_value);
  };

  return <input type="password" name={name} maxLength={size} value={value} onChange={handleChange}></input>;
}
