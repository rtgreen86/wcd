import React from 'react';

export default function Lock({ token, onLogin }) {
  return (
    <>
      <div>Application is locked</div>
      <div>Token is {token}</div>
      <button type="button" onClick={onLogin}>
        Sign In
      </button>
    </>
  );
}
