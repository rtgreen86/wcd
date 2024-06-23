import React, { FocusEvent, ChangeEvent, FormEvent } from 'react';

import './LoginForm.css';

type Props = {
  value?: string,
  autoFocus?: boolean,
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void,
  onChangeValue?: (value: string) => void,
  onPinEntered?: (pin: string) => void
};

export default function LoginForm({
  value = '',
  autoFocus = false,
  onChange = () => {},
  onChangeValue = () => {},
  onPinEntered = () => {}
}: Props) {
  const rxPartialPin = /^\d{1,4}$/;
  const rxFullPin = /^\d{4}$/;

  const handleFocus = (event: FocusEvent) => {
    event.currentTarget.removeAttribute('readonly');
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    if (value === '' || rxPartialPin.test(value)) {
      onChange(event);
      onChangeValue(value);
    }
    if (rxFullPin.test(value)) {
      onPinEntered(value);
    }
  }

  return (<form className="login-form">
    <div>
      Доступ ограничен.<br />
      Пожалуйста введите ПИН-код.
    </div>
    <input
      value={value}
      autoFocus={autoFocus}
      type="password"
      pattern="\d{4}"
      autoComplete="off"
      readOnly
      onFocus={handleFocus}
      onChange={handleChange} /><br />
  </form>);
}
