import React, { useState, ReactNode } from 'react';
import { AuthContext } from '../contexts/AuthContext';

type Props = {
  children: ReactNode
};

export default function AuthProvider({ children }: Props) {
  const [token, setToken] = useState<string | null>(null);
  return (<AuthContext.Provider value={{token, setToken}}>{ children }</AuthContext.Provider>);
}
