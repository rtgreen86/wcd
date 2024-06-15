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

const getClassNames = ({ buttonStyle = 'secondary', buttonSize }: ButtonProps) => classNames(
  'btn',
  `btn-${buttonStyle}`,
  {
    'btn-lg': buttonSize === 'large',
    'btn-sm': buttonSize === 'small'
  }
);

export default function Button(props: ButtonProps) {
  if (props.action === 'toggle-modal') {
    const {action, buttonStyle, buttonSize, children, modalTarget, ...restProps } = props;
    return <button className={getClassNames(props)} data-bs-toggle="modal" data-bs-target={props.modalTarget} {...restProps}>{children}</button>;
  }

  if (props.action === 'dismiss-modal') {
    const { action, buttonStyle, buttonSize, children, ...restProps } = props;
    return <button className={getClassNames(props)} data-bs-dismiss="modal" {...restProps}>{children}</button>;
  }

  const { action, buttonStyle, buttonSize, children, ...restProps } = props;
  return <button className={getClassNames(props)} {...restProps}>{children}</button>
}
