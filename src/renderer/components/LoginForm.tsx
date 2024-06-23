import React, { FocusEvent, ChangeEvent, FormEvent } from 'react';
import InputPin from './controls/InputPin';

import './LoginForm.css';

type Props = {
  autoFocus?: boolean,
  onPinEntered?: (pin: string) => void
};

export default function LoginForm({
  autoFocus = false,
  onPinEntered = () => {}
}: Props) {
  const rxFullPin = /^\d{4}$/;

  const handleFocus = (event: FocusEvent) => {
    event.currentTarget.removeAttribute('readonly');
  }

  const handleChange = (value: string) => {
    if (rxFullPin.test(value)) {
      onPinEntered(value);
    }
  }

  return (<form className="login-form">
    <div>
      Доступ ограничен.<br />
      Пожалуйста введите ПИН-код.
    </div>
    <InputPin className="" autoFocus={autoFocus} name="pin" maxLength={4} pattern="\d{4}" readOnly onFocus={handleFocus} onChange={handleChange} /><br />
  </form>);
}
