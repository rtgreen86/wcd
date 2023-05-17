import './Panel.css';
import React from 'react';
import PropTypes from 'prop-types';

export default function Panel({ top, children }) {
  const className = [
    'panel',
    top ? 'top-panel' : ''
  ].join(' ');
  return <header className={className}>{ children }</header>
}

Panel.propTypes = {
  top: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
};

Panel.defaultProps = {
  top: false,
}
