import React from 'react';
import { Outlet } from "react-router-dom";

export default function HomeScreen() {
  return (
    <>
      <div>Main toolbar here</div>
      <Outlet />
    </>
  );
}