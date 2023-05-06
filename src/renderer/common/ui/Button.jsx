import React from 'react';
import PropTypes from 'prop-types';

export default function Button({ isAccent, isDisabled, children }) {
  return (<button type="button" className={isAccent ? 'accent' : ''} disabled={isDisabled}>{children}</button>);
}

Button.propTypes = {
  isAccent: PropTypes.bool,
  isDisabled: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
}

Button.defaultProps = {
  isAccent: false,
  isDisabled: false
};
