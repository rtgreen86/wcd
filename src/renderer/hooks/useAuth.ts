import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { checkPinExists, getToken, signOut } from '../api';

export function useAuth() {
  const {token, setToken} = useContext(AuthContext);

  const login = async (pin: string) => {
    const token = await getToken(pin);
    setToken(token);
    return Boolean(token);
  };

  const logout = async () => {
    setToken(null);
    await signOut();
  };

  return {token, login, logout, isPinExist: checkPinExists};
}
