import React, { useState, ReactNode } from 'react';
import Api from '../api';
import { AuthContext } from '../contexts/AuthContext';

type Props = {
  children: ReactNode
};

export default function AuthProvider({ children }: Props) {
  const [token, setToken] = useState<string | null>(null);

  const signin = (pin: string) => {
    Api.getToken(pin)
      .then((token: string) => { setToken(token); })
      .catch(() => setToken(null));
  };

  const signout = () => {
    setToken(null);
  };

  const value = { token, signin, signout };

  return (<AuthContext.Provider value={value}>{ children }</AuthContext.Provider>);
}
