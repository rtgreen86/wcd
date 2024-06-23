import React, { useState, ReactNode } from 'react';
import { Pin } from '../api';
import { AuthContext } from '../contexts/AuthContext';

type Props = {
  children: ReactNode
};

export default function AuthProvider({ children }: Props) {
  const [token, setToken] = useState<string | null>(null);

  const signin = async (pin: string) => {
    setToken('token');
  };

  const signout = () => {
    setToken(null);
  };

  const isPinExists = Pin.isPinExist;

  const value = { token, signin, signout, isPinExists };

  return (<AuthContext.Provider value={value}>{ children }</AuthContext.Provider>);
}
