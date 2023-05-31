import React from 'react';
import { useNavigate } from "react-router-dom";
import { Panel, Button, Menu, MenuItem, MenuExtender } from '../Lib/UIKit';

export default function MainPanel() {
  const navigate = useNavigate();
  return (
    <Panel top>
      <Menu>
        <MenuItem><Button><i className="material-icons">arrow_back_ios</i></Button></MenuItem>
        <MenuItem><span>2023</span></MenuItem>
        <MenuItem><Button><i className="material-icons">arrow_forward_ios</i></Button></MenuItem>
        <MenuItem><Button>Отметить</Button></MenuItem>
        <MenuItem><Button onClick={() => navigate('/controls')}>Контролы</Button></MenuItem>
        <MenuItem><Button onClick={() => navigate('/invoices')}>Invoices</Button></MenuItem>
        <MenuExtender />
        <MenuItem><Button><i className="material-icons">help</i></Button></MenuItem>
        <MenuItem><Button onClick={() => navigate('/settings')}><i className="material-icons">settings</i></Button></MenuItem>
        <MenuItem><Button onClick={() => navigate('/lock')}><i className="material-icons">lock</i></Button></MenuItem>
      </Menu>
    </Panel>
  );
}





