import React, { ReactNode, MouseEvent, forwardRef } from 'react';
import classNames from 'classnames';
import * as ButtonStyles from './ButtonStyles';

export type ButtonStyle = typeof ButtonStyles[keyof typeof ButtonStyles];

type ButtonType = 'button' | 'submit' | 'reset';

type ButtonSize = 'large' | 'small';

export interface ButtonProps {
  id?: string;
  buttonStyle?: ButtonStyle;
  buttonSize?: ButtonSize;
  type?: ButtonType;
  disabled?: boolean;
  children?: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
};

export const getClassName = ({
  buttonStyle = 'secondary',
  buttonSize
}: Pick<ButtonProps, 'buttonStyle' | 'buttonSize'>) => classNames(
  'btn',
  `btn-${buttonStyle}`,
  {
    'btn-lg': buttonSize === 'large',
    'btn-sm': buttonSize === 'small'
  }
);

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  buttonStyle, buttonSize, children,
  ...restProps
}: ButtonProps, ref) => {
  return <button ref={ref} className={getClassName({ buttonStyle, buttonSize })} { ...restProps }>{ children }</button>
});

export default Button;
