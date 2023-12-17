import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from "react-router-dom";
import { MainNavBar, NavItem } from '../lib/UIKit';
import { yearDecrement, yearIncrement } from '../actions';
import { useDispatch } from '../hooks';

export default function MainPanel({ year }: { year: number }) {
  const dispatch = useDispatch();

  return (
    <MainNavBar>
      <NavItem><button className="btn" onClick={() => { dispatch(yearDecrement()) }}><i className="material-icons">keyboard_arrow_down</i></button></NavItem>
      <NavItem><span className="nav-link">{year}</span></NavItem>
      <NavItem><button className="btn" onClick={() => { dispatch(yearIncrement()) }}><i className="material-icons">keyboard_arrow_up</i></button></NavItem>
      <NavItem><button className="btn">Отметить</button></NavItem>
      <NavItem><NavLink className="btn" to="/invoices">Invoices</NavLink></NavItem>
      <NavItem position="right"><NavLink className="btn" to="/lock"><i className="material-icons">lock</i></NavLink></NavItem>
      <NavItem position="right"><NavLink className="btn" to="/settings"><i className="material-icons">settings</i></NavLink></NavItem>
    </MainNavBar>
  );
}

MainPanel.propTypes = {
  year: PropTypes.number.isRequired,
  onDispatch: PropTypes.func.isRequired
}
