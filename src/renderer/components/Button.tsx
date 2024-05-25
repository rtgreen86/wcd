import React, { ReactNode } from 'react';
import * as ButtonStyles from './ButtonStyles';
import classNames from 'classnames';

type ButtonStyle = typeof ButtonStyles[keyof typeof ButtonStyles];

type ButtonSize = 'large' | 'small';

type ButtonType = 'button' | 'submit' | 'reset';

type ButtonWithHandlerProps = {
  id?: string,
  buttonType?: ButtonType,
  buttonStyle?: ButtonStyle,
  buttonSize?: ButtonSize,
  disabled?: boolean,
  onClick?: () => void,
  children?: ReactNode
};

type ToggleModalButtonProps = {
  id?: string,
  buttonType?: ButtonType,
  buttonStyle?: ButtonStyle,
  buttonSize?: ButtonSize,
  disabled?: boolean,
  modalTarget: string,
  onClick: 'modal-toggle',
  children?: ReactNode
};

type DismissModalButtonProps = {
  id?: string,
  buttonType?: ButtonType,
  buttonStyle?: ButtonStyle,
  buttonSize?: ButtonSize,
  disabled?: boolean,
  onClick: 'modal-dismiss',
  children?: ReactNode
};

const noop = () => {};

export default function Button(props: ButtonWithHandlerProps | ToggleModalButtonProps | DismissModalButtonProps) {
  const {
    id,
    buttonType = 'button',
    buttonStyle = 'secondary',
    buttonSize,
    disabled,
    children
  } = props;

  const className = classNames('btn', `btn-${buttonStyle}`, {
    'btn-lg': buttonSize === 'large',
    'btn-sm': buttonSize === 'small'
  });

  if (props.onClick === 'modal-dismiss') {
    return <button id={id} type={buttonType} className={className} disabled={disabled} data-bs-dismiss="modal">{children}</button>;
  }

  if (props.onClick === 'modal-toggle') {
    return <button id={id} type={buttonType} className={className} disabled={disabled} data-bs-toggle="modal" data-bs-target={props.modalTarget}>{children}</button>;
  }

  return <button id={id} type={buttonType} className={className} disabled={disabled} onClick={props.onClick}>{children}</button>;
};
