import React, { useState, useEffect, FocusEvent } from 'react';
import InputPin from './controls/InputPin';
import { useAuth } from '../hooks/useAuth';
import { isPinExists } from '@api/apiBridge';

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
  const [message, setMessage] = useState('');
  const {login} = useAuth();

  useEffect(() => {
    (async () => {
      const pinExists = await isPinExists();
      setLoading(false);
      if (!pinExists) {
        login('');
      }
    })();
  }, []);

  const rxFullPin = /^\d{4}$/;

  const handleFocus = (event: FocusEvent) => {
    event.currentTarget.removeAttribute('readonly');
  }

  const handleChange = async (value: string) => {
    if (rxFullPin.test(value)) {
      setLoading(true);
      setMessage('');
      const success = await login(value);
      setLoading(false);
      if (!success) {
        setMessage('Неверный PIN код.');
      }
    }
  }

  if (isLoading) {
    return (<div>Loading...</div>);
  }

  return (<form className="login-form">
    <div>
      Доступ ограничен.<br />
      Пожалуйста введите ПИН-код.
    </div>
    {message !== '' && <div>{message}</div>}
    <InputPin className="" autoFocus={autoFocus} name="pin" maxLength={4} pattern="\d{4}" readOnly onFocus={handleFocus} onChange={handleChange} /><br />
  </form>);
}
