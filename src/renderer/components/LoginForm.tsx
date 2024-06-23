import React, { useState, useEffect, FocusEvent } from 'react';
import InputPin from './controls/InputPin';
import {Pin} from '../api'

import './LoginForm.css';

type Props = {
  autoFocus?: boolean,
  onLogin: (token: string) => void;
  onPinEntered?: (pin: string) => void
};

export default function LoginForm({
  autoFocus = false,
  onLogin,
  onPinEntered = () => {}
}: Props) {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const isPinExists = await Pin.isPinExist();
      setLoading(false);

      if (!isPinExists) {
        onLogin('token');
      }
    })();
  }, []);

  const rxFullPin = /^\d{4}$/;

  const handleFocus = (event: FocusEvent) => {
    event.currentTarget.removeAttribute('readonly');
  }

  const handleChange = (value: string) => {
    if (rxFullPin.test(value)) {
      onPinEntered(value);
      onLogin('token');
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
