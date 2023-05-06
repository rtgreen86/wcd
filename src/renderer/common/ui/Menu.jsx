import React from 'react';
import PropTypes from 'prop-types';

export default function Menu({ children }) {
  return (<ul className="menu clearfix">{children}</ul>);
}

Menu.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
};
