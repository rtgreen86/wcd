import React from 'react';
import { Outlet } from 'react-router-dom';
import MainPanel from '../components/MainPanel.jsx';

export default function MainScreen() {
  return (
    <>
      <MainPanel />
      <Outlet />
    </>
  );
}