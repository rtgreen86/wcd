import React, { ReactNode } from 'react';
import * as ButtonStyles from './ButtonStyles';
import classNames from 'classnames';

type ButtonStyle = typeof ButtonStyles[keyof typeof ButtonStyles];

type ButtonSize = 'large' | 'small';

type ButtonType = 'button' | 'submit' | 'reset';

export interface ButtonProps {
  id?: string,
  buttonType?: ButtonType,
  buttonStyle?: ButtonStyle,
  buttonSize?: ButtonSize,
  disabled?: boolean,
  onClick?: () => void,
  children?: ReactNode
}

type ButtonWithHandlerProps = {
  id?: string,
  buttonType?: ButtonType,
  buttonStyle?: ButtonStyle,
  buttonSize?: ButtonSize,
  disabled?: boolean,
  onClick?: () => void,
  children?: ReactNode
};

const noop = () => {};

export default function Button({
  id,
  buttonType = 'button',
  buttonStyle = 'secondary',
  buttonSize,
  disabled,
  children,
  onClick = noop
}: ButtonProps) {
  const className = classNames('btn', `btn-${buttonStyle}`, {
    'btn-lg': buttonSize === 'large',
    'btn-sm': buttonSize === 'small'
  });

  return <button id={id} type={buttonType} className={className} disabled={disabled} onClick={onClick}>{children}</button>;
};
