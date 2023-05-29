import React from 'react';
import { useNavigate } from "react-router-dom";
import { Panel, Button, Menu, MenuItem } from './UIKit';

export default function MainPanel() {
  const navigate = useNavigate();
  return (
    <Panel top>
      <Menu>
        <MenuItem><Button>&lt;</Button><span>2023</span><Button>&gt;</Button></MenuItem>
        <MenuItem><Button>Отметить</Button></MenuItem>
        <MenuItem><Button onClick={() => navigate('/controls')}>Контролы</Button></MenuItem>
        <MenuItem><Button onClick={() => navigate('/invoices')}>Invoices</Button></MenuItem>
        <MenuItem align="right"><Button onClick={() => navigate('/lock')}>Блокировка</Button></MenuItem>
        <MenuItem align="right"><Button onClick={() => navigate('/settings')}>Параметры</Button></MenuItem>
        <MenuItem align="right"><Button>?</Button></MenuItem>
      </Menu>



    </Panel>
  );
}
