import React from 'react';
import { Outlet } from 'react-router-dom';
import MainPanel from './MainPanel.jsx';

export default function HomeScreen() {
  return (
    <>
      <MainPanel />
      <Outlet />
    </>
  );
}