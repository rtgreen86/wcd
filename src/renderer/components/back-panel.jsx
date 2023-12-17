import React from 'react';
import { useNavigate } from "react-router-dom";
import { MainNavBar, NavItem } from '../lib/UIKit';

export default function BackPanel() {
  const navigate = useNavigate();
  return (
    <MainNavBar>
      <NavItem><button className="btn" onClick={() => navigate('/app')}><i className="material-icons">keyboard_arrow_left</i></button></NavItem>
    </MainNavBar>
  );
}
