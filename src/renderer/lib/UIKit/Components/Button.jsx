import React from 'react';
import PropTypes from 'prop-types';

export default function Button({ accent, disabled, onClick, children }) {
  return (
    <button
      type="button"
      className={accent ? 'accent' : ''}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  accent: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
}

Button.defaultProps = {
  isAccent: false,
  isDisabled: false
};
