import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate, NavLink } from "react-router-dom";
import { Button, NavBar, NavItem } from '../lib/UIKit';
import { yearDecrement, yearIncrement } from '../actions';
import { useDispatch } from '../hooks';

export default function MainPanel({ year, onDispatch = () => {/* */} }: { year: number, onDispatch: (arg: any) => void}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <NavBar>
      <NavItem><button className="btn" onClick={() => { dispatch(yearIncrement()) }}><i className="material-icons">keyboard_arrow_up</i></button></NavItem>
      <NavItem><span className="nav-link">{year}</span></NavItem>
      <NavItem><button className="btn" onClick={() => { dispatch(yearDecrement()) }}><i className="material-icons">keyboard_arrow_down</i></button></NavItem>
      <NavItem><Button>Отметить</Button></NavItem>
      <NavItem><Button onClick={() => navigate('/controls')}>Контролы</Button></NavItem>
      <NavItem><NavLink to="/invoices">Invoices</NavLink></NavItem>
      <NavItem position="Right"><NavLink to="/lock"><i className="material-icons">lock</i></NavLink></NavItem>
      <NavItem position="Right"><NavLink to="/settings"><i className="material-icons">settings</i></NavLink></NavItem>
      <NavItem position="Right"><Button><i className="material-icons">help</i></Button></NavItem>
    </NavBar>
  );
}

MainPanel.propTypes = {
  year: PropTypes.number.isRequired,
  onDispatch: PropTypes.func.isRequired
}
