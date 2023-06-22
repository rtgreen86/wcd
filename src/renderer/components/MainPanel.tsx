import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate, NavLink } from "react-router-dom";
import { Button, MenuItem, TopToolbar } from '../lib/UIKit';

export default function MainPanel({ year, onDispatch = () => {} }) {
  const navigate = useNavigate();

  return (
    <TopToolbar>
      <MenuItem><Button onClick={() => { onDispatch({ type: 'year/increment' }) }}><i className="material-icons">keyboard_arrow_up</i></Button></MenuItem>
      <MenuItem><span>{year}</span></MenuItem>
      <MenuItem><Button onClick={() => { onDispatch({ type: 'year/decrement' }) }}><i className="material-icons">keyboard_arrow_down</i></Button></MenuItem>
      <MenuItem><Button>Отметить</Button></MenuItem>
      <MenuItem><Button onClick={() => navigate('/controls')}>Контролы</Button></MenuItem>
      <MenuItem><NavLink to="/invoices">Invoices</NavLink></MenuItem>
      <MenuItem position="Right"><NavLink to="/lock"><i className="material-icons">lock</i></NavLink></MenuItem>
      <MenuItem position="Right"><NavLink to="/settings"><i className="material-icons">settings</i></NavLink></MenuItem>
      <MenuItem position="Right"><Button><i className="material-icons">help</i></Button></MenuItem>
    </TopToolbar>
  );
}

MainPanel.propTypes = {
  year: PropTypes.number.isRequired,
  onDispatch: PropTypes.func.isRequired
}