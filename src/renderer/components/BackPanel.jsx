import React from 'react';
import { useNavigate } from "react-router-dom";
import { Button, Panel, Menu, MenuItem } from '../Lib/UIKit';

export default function BackPanel() {
  const navigate = useNavigate();
  return (
    <Panel top>
      <Menu>
        <MenuItem><Button onClick={() => navigate('/')}>&lt;</Button></MenuItem>
      </Menu>
    </Panel>
  );
}
