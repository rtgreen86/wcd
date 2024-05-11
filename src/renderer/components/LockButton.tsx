import React from 'react';
import { useAuth } from '../hooks';

export default function LockButton() {
  const { signout } = useAuth();
  return <button className="btn" onClick={() => { signout(); }}><i className="material-icons">lock</i></button>;
}
