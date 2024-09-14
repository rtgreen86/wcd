import React from 'react';
import {ButtonProps, getClassName} from './Button';

export const ModalButtonClose = ({
  buttonStyle,
  buttonSize,
  type = 'button',
  children,
  ...restProps
}: ButtonProps) => (
  <button className={getClassName({buttonStyle, buttonSize})} type={type} data-bs-dismiss="modal" {...restProps}>{children}</button>
);

export default ModalButtonClose;
