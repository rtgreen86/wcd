import React from 'react';
import { Outlet } from 'react-router-dom';
import MainPanel from '../components/main-panel';
import { useDispatch, useStore } from '../hooks';

export default function MainScreen() {
  const store = useStore();
  const dispatch = useDispatch();

  return (
    <>
      <MainPanel year={ store.year } onDispatch={ dispatch } />
      <Outlet />
    </>
  );
}