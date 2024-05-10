import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { isPinExist, getToken } from '../api/authenticator';

export function useAuth() {
  const {token, setToken} = useContext(AuthContext);

  const login = async (pin: string) => {
    const token = await getToken(pin);
    setToken(token);
    return Boolean(token);
  };

  const logout = () => {
    setToken(null);
  };

  return {token, login, logout, isPinExist};
}
