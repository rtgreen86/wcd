import React from 'react';

import './Toolbar.css';

export default function Toolbar({ className, children }) {
  return (
    <nav className={className}><ul>
      { children }
    </ul></nav>
  );
}

Toolbar.defaultProps = {
  className: 'uikit-toolbar'
}
