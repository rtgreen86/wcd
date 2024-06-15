import React, { ReactNode } from 'react';
import classNames from 'classnames';
import * as ButtonStyles from './ButtonStyles';

type ButtonStyle = typeof ButtonStyles[keyof typeof ButtonStyles];

type ButtonType = 'button' | 'submit' | 'reset';

type ButtonSize = 'large' | 'small';

interface CommonButtonProps {
  id?: string;
  buttonStyle?: ButtonStyle;
  buttonSize?: ButtonSize;
  type?: ButtonType;
  disabled?: boolean;
  children?: ReactNode;
}

interface ToggleModalButtonProps extends CommonButtonProps {
  action: 'toggle-modal';
  modalTarget: string;
}

interface DismissModalButtonProps extends CommonButtonProps {
  action: 'dismiss-modal';
}

interface DefaultButtonProps extends CommonButtonProps {
  action?: 'default',
}

type ButtonProps = ToggleModalButtonProps | DismissModalButtonProps | DefaultButtonProps;

export default function Button(props: ButtonProps) {
  if (props.action === 'toggle-modal') {
    const {action, buttonStyle = 'secondary', buttonSize, children, modalTarget, ...restProps } = props;
    const className = classNames('btn', `btn-${buttonStyle}`, {
      'btn-lg': buttonSize === 'large',
      'btn-sm': buttonSize === 'small'
    });
    return <button className={className} data-bs-toggle="modal" data-bs-target={props.modalTarget} {...restProps}>{children}</button>;
  }

  if (props.action === 'dismiss-modal') {
    const { action, buttonStyle = 'secondary', buttonSize, children, ...restProps } = props;
    const className = classNames('btn', `btn-${buttonStyle}`, {
      'btn-lg': buttonSize === 'large',
      'btn-sm': buttonSize === 'small'
    });
    return <button className={className} data-bs-dismiss="modal" {...restProps}>{children}</button>;
  }

  const { action, buttonStyle = 'secondary', buttonSize, children, ...restProps } = props;
  const className = classNames('btn', `btn-${buttonStyle}`, {
    'btn-lg': buttonSize === 'large',
    'btn-sm': buttonSize === 'small'
  });
  return <button className={className} {...restProps}>{children}</button>
}
