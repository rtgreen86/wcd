/** For more details on
 * `authContext`, `ProvideAuth`, `useAuth` and `useProvideAuth`
 * refer to: https://usehooks.com/useAuth/
 */

// Top level App component

// import React from "react";
// import { ProvideAuth } from "./use-auth.js";
// function App(props) {
//   return (
//     <ProvideAuth>
//       {/*
//         Route components here, depending on how your app is structured.
//         If using Next.js this would be /pages/_app.js
//       */}
//     </ProvideAuth>
//   );
// }



// Any component that wants auth state
// import React from "react";
// import { useAuth } from "./use-auth.js";
// function Navbar(props) {
//   // Get auth state and re-render anytime it changes
//   const auth = useAuth();
//   return (
//     <NavbarContainer>
//       <Logo />
//       <Menu>
//         <Link to="/about">About</Link>
//         <Link to="/contact">Contact</Link>
//         {auth.user ? (
//           <Fragment>
//             <Link to="/account">Account ({auth.user.email})</Link>
//             <Button onClick={() => auth.signout()}>Signout</Button>
//           </Fragment>
//         ) : (
//           <Link to="/signin">Signin</Link>
//         )}
//       </Menu>
//     </NavbarContainer>
//   );
// }


import React, { useState, useEffect, useContext, createContext } from "react";
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
