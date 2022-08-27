import React from 'react';
import { useAuth } from '../features/auth';

export default function Lock() {
  const { signin } = useAuth();

  const handleLogin = async () => {
    await signin();
  }

  return (
    <>
      <div>Application is locked</div>
      <button type="button" onClick={handleLogin}>
        Sign In
      </button>
    </>
  );
}
