import React from 'react';
import PropTypes from 'prop-types';
import Toolbar from './Toolbar.jsx';

import './HorizontalToolbar.css';

export default function HorizontalToolbar({ className, children }) {
  return (<Toolbar className={className}>{ children }</Toolbar>)
}

HorizontalToolbar.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};

HorizontalToolbar.defaultProps = {
  className: 'uikit-toolbar horizontal clearfix',
}
