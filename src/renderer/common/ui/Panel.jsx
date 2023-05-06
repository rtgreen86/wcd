import React from 'react';
import PropTypes from 'prop-types';

export default function Panel({ children }) {
  return <header className="panel">{ children }</header>
}

Panel.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
};
