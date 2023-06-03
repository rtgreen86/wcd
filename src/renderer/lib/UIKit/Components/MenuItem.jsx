import React from 'react';
import PropTypes from 'prop-types';

export default function MenuItem({ position, children }) {
  return (<li className={position.toLowerCase()}>{children}</li>);
}

MenuItem.propTypes = {
  position: PropTypes.oneOf(['Left', 'Right', 'None']),
  children: PropTypes.node
};

MenuItem.defaultProps = {
  position: 'None'
};
