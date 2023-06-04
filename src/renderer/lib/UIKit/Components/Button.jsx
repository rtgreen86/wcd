import React from 'react';
import PropTypes from 'prop-types';
import { classNameFromDictionary } from '../lib/classNameUtils';

export default function Button({ accent, disabled, onClick, children }) {
  return (
    <button
      type="button"
      className={classNameFromDictionary({ accent })}
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
  children: PropTypes.node,
}

Button.defaultProps = {
  isAccent: false,
  isDisabled: false
};
