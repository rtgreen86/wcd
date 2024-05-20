import React, { ReactNode } from 'react';

export enum ButtonType {
  Button = 'button',
  Submit = 'submit',
  Reset = 'reset',
  Modal = 'modal'
};

export enum ButtonStyle {
  Primary = 'btn-primary',
  Secondary = 'btn-secondary',
  Success = 'btn-success',
  Danger = 'btn-danger',
  Warning = 'btn-warning',
  Info = 'btn-info',
  Light = 'btn-light',
  Dark = 'btn-dark',
  Link = 'btn-link',
  OutlinePrimary = 'btn-outline-primary',
  OutlineSecondary = 'btn-outline-secondary',
  OutlineSuccess = 'btn-outline-success',
  OutlineDanger = 'btn-outline-danger',
  OutlineWarning = 'btn-outline-warning',
  OutlineInfo = 'btn-outline-info',
  OutlineLight = 'btn-outline-light',
  OutlineDark = 'btn-outline-dark'
};

export enum ButtonSize {
  Large = 'btn-lg',
  Normal = '',
  Small = 'btn-sm'
};

type Props = {
  buttonType?: ButtonType,
  buttonStyle?: ButtonStyle,
  buttonSize?: ButtonSize,
  disabled?: boolean,
  modalTarget?: string,
  onClick?: () => void,
  children?: ReactNode
};

const noop = () => {};

export default function Button({
  buttonType = ButtonType.Button,
  buttonStyle = ButtonStyle.Secondary,
  buttonSize = ButtonSize.Normal,
  disabled = false,
  modalTarget = '',
  onClick = noop,
  children,
}: Props) {
  const className = `btn ${buttonStyle} ${buttonSize}`;

  if (buttonType === ButtonType.Modal) {
    return (
      <button type="button" className={className} disabled={disabled} data-bs-toggle="modal" data-bs-target={modalTarget}>{children}</button>
    );
  }

  return (
    <button type={buttonType} className={className} disabled={disabled} onClick={onClick}>{children}</button>
  );
};
