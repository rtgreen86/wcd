import React, { useState, useContext, createContext } from "react";
import AuthMock from './AuthMock';

const authContext = createContext();

export const useAuth = () => {
  return useContext(authContext);
};

export const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

const useProvideAuth = () => {
  const [token, setToken] = useState(null);

  const signin = async () => {
    setToken(await AuthMock.getToken());
  };

  const signout = () => {
    setToken(null);
  };

  return { token, signin, signout };
}
