import React from 'react';
import { useNavigate } from "react-router-dom";
import { Button, MenuItem, TopToolbar } from '../lib/UIKit';

export default function BackPanel() {
  const navigate = useNavigate();
  return (
    <TopToolbar>
      <MenuItem><Button onClick={() => navigate('/')}><i className="material-icons">keyboard_arrow_left</i></Button></MenuItem>
    </TopToolbar>
  );
}
