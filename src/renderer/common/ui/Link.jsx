import React from 'react';
import PropTypes from 'prop-types';

export default function Link({ href, children }) {
  return (<a href={href}>{children}</a>);
}

Link.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
}
