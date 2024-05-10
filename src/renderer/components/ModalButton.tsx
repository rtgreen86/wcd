import React from 'react';
import classNames from 'classnames';

import { ButtonProps } from './Button';

export interface ModalToggleButtonProps extends ButtonProps {
  modalAction: 'modal-toggle',
  modalTarget: string,
};

export interface ModalDismissButtonProps extends ButtonProps {
  modalAction: 'modal-dismiss',
};

type ModalButtonProps = ModalToggleButtonProps | ModalDismissButtonProps;

export default function ModalButton(props: ModalButtonProps) {
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

  if (props.modalAction === 'modal-dismiss') {
    return <button id={id} type={buttonType} className={className} disabled={disabled} data-bs-dismiss="modal">{children}</button>;
  }

  return <button id={id} type={buttonType} className={className} disabled={disabled} data-bs-toggle="modal" data-bs-target={props.modalTarget}>{children}</button>;
}
