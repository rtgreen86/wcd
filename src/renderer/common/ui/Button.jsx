import React from 'react';

export default function Button({ isAccent, isDisabled, children }) {
  return (<button type="button" className={isAccent ? 'accent' : ''} disabled={isDisabled}>{children}</button>);
}

Button.defaultProps = {
  isAccent: false,
  isDisabled: false
};
