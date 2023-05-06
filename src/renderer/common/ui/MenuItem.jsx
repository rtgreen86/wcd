import React from 'react';
import PropTypes from 'prop-types';

export default function MenuItem({ align, children }) {
  return (<li className={align === 'right' ? 'right': ''}>{children}</li>);
}

MenuItem.propTypes = {
  align: PropTypes.oneOf(['left', 'right']),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
};

MenuItem.defaultProps = {
  align: 'left',
};
