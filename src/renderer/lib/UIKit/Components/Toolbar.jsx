import React from 'react';
import PropTypes from 'prop-types';

import './Toolbar.css';

export default function Toolbar({ className, children }) {
  return (
    <nav className={className}><ul>
      { children }
    </ul></nav>
  );
}

Toolbar.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};

Toolbar.defaultProps = {
  className: 'uikit-toolbar'
}
