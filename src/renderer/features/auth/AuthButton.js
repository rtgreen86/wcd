import React from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from './auth';

export default function AuthButton() {
  let history = useHistory();
  let auth = useAuth();

  return auth.token ? (
    <p>
      Welcome!{" "}
      <button
        onClick={() => {
          auth.signout(() => history.push("/"));
        }}
      >
        Sign out
      </button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  );
}
