import React, { ReactNode } from 'react';
import { useAuth } from '../hooks';
import { Navigate } from 'react-router-dom';

type Props = {
  children: ReactNode
}

export default function RequireAuth({ children }: Props) {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/lock" replace />;
  }

  return children;
}
