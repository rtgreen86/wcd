import { createContext } from 'react';

export interface AuthContextType {
  token: string | null,
  signin: (pin: string) => void,
  signout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  token: 'fake-token',
  signin() {},
  signout() {}
});
