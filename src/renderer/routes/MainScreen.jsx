import React from 'react';
import { Outlet } from 'react-router-dom';
import MainPanel from '../Components/MainPanel.jsx';

export default function MainScreen() {
  return (
    <>
      <MainPanel />
      <Outlet />
    </>
  );
}