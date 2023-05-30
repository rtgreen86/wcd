import React from 'react';
import { useNavigate } from "react-router-dom";
import { Panel, Menu, MenuItem } from './UIKit';
import { Button } from '../Lib/UIKit';

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
