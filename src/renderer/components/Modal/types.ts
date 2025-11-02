import { ReactNode, FormEvent } from 'react';
import { ModalTypes, ModalButtons } from './enums';

export interface ModalEvent extends Event {
  relatedTarget?: HTMLElement,
};

type ButtonCaptions = {
  captionOK?: string,
  captionCancel?: string,
};

type ModalHandlers = {
  onHide?: (event: ModalEvent) => void,
  onHidden?: (event: ModalEvent) => void,
  onHidePrevented?: (event: ModalEvent) => void,
  onShow?: (event: ModalEvent) => void,
  onShown?: (event: ModalEvent) => void,
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void,
  onStateChanged?: (isOpen: boolean) => void
};

export type ModalProps = ModalHandlers & ButtonCaptions & {
    id: string,
    className?: string,
    title?: string,
    modalTypes?: ModalTypes,
    modalButtons?: ModalButtons,
    isOpen?: boolean,
    disabled?: boolean,
    ariaLabel?: string,
    children?: ReactNode,
};
