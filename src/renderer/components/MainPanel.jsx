import React from 'react';
import { useNavigate } from "react-router-dom";
import { Panel, Button, Menu, MenuItem, MenuExtender } from '../Lib/UIKit';

export default function MainPanel() {
  const navigate = useNavigate();
  return (
    <Panel top>
      <Menu>
        <MenuItem><Button>&lt;</Button></MenuItem>
        <MenuItem><span>2023</span></MenuItem>
        <MenuItem><Button>&gt;</Button></MenuItem>
        <MenuItem><Button>Отметить</Button></MenuItem>
        <MenuItem><Button onClick={() => navigate('/controls')}>Контролы</Button></MenuItem>
        <MenuItem><Button onClick={() => navigate('/invoices')}>Invoices</Button></MenuItem>
        <MenuExtender />
        <MenuItem><Button>?</Button></MenuItem>
        <MenuItem><Button onClick={() => navigate('/settings')}>Параметры</Button></MenuItem>
        <MenuItem><Button onClick={() => navigate('/lock')}>Блокировка</Button></MenuItem>
      </Menu>
    </Panel>
  );
}
