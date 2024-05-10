import React from 'react';
import { useAuth } from '../hooks';

export default function LockButton() {
  const { logout } = useAuth();
  return <button className="btn" onClick={() => { logout(); }}><i className="material-icons">lock</i></button>;
}
