import React from 'react';
import { Outlet } from 'react-router-dom';
import MainPanel from '../components/MainPanel';

export default function MainScreen() {
  return (
    <>
      <MainPanel />
      <Outlet />
    </>
  );
}