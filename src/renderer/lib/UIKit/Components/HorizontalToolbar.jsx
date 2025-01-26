import React from 'react';
import Toolbar from './Toolbar';

import './HorizontalToolbar.css';

export default function HorizontalToolbar({ className, children }) {
  return (<Toolbar className={className}>{ children }</Toolbar>)
}

HorizontalToolbar.defaultProps = {
  className: 'uikit-toolbar horizontal clearfix',
}
