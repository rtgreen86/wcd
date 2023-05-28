import React from 'react';
import { useNavigate } from "react-router-dom";
import { Panel, Button, Menu, MenuItem } from './UIKit';

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
