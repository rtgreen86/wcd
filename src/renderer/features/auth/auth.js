/** For more details on
 * `authContext`, `ProvideAuth`, `useAuth` and `useProvideAuth`
 * refer to: https://usehooks.com/useAuth/
 */

import React, { useState, useContext, createContext } from "react";
import AuthMock from './AuthMock';

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [token, setToken] = useState(null);

  const signin = async () => {
    setToken(await AuthMock.getToken());
  };

  const signout = () => {
    setToken(null);
  };

  return { token, signin, signout };
}
