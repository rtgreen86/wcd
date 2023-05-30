import React from 'react';
import PropTypes from 'prop-types';

export default function MenuItem({ children }) {
  return (<li>{children}</li>);
}

MenuItem.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
};
