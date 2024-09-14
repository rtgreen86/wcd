import React, { ReactNode, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import {Modal as BootstrapModal} from 'bootstrap';

export interface ModalEvent extends Event {
  relatedTarget?: HTMLElement,
}

export interface ModalProps {
  id: string,
  isOpen: boolean,
  children?: ReactNode,
  onHide?: (event: ModalEvent) => void,
  onHidden?: (event: ModalEvent) => void,
  onHidePrevented?: (event: ModalEvent) => void,
  onShow?: (event: ModalEvent) => void,
  onShown?: (event: ModalEvent) => void,
  onStateChanged: (isOpen: boolean) => void;
}

export interface ModalRef {
  close: () => undefined,
}

export const Modal = forwardRef<ModalRef, ModalProps>(({
  id,
  isOpen = false,
  children,
  onHide = () => undefined,
  onHidden = () => undefined,
  onHidePrevented = () => undefined,
  onShow = () => undefined,
  onShown = () => undefined,
  onStateChanged
}, forwardedRef) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(forwardedRef, () => ({
    close() {
      if (modalRef.current) {
        BootstrapModal.getInstance(modalRef.current).hide();
      }
    }
  }), []);

  useEffect(() => {
    if (modalRef.current) {
      BootstrapModal.getOrCreateInstance(modalRef.current);
      modalRef.current.addEventListener('hide.bs.modal', onHide);
      modalRef.current.addEventListener('hidden.bs.modal', handleHidden);
      modalRef.current.addEventListener('hidePrevented.bs.modal', onHidePrevented);
      modalRef.current.addEventListener('show.bs.modal', onShow);
      modalRef.current.addEventListener('shown.bs.modal', handleShown);
    }
    return () => {
      if (modalRef.current) {
        modalRef.current.removeEventListener('hide.bs.modal', onHide);
        modalRef.current.removeEventListener('hidden.bs.modal', handleHidden);
        modalRef.current.removeEventListener('hidePrevented.bs.modal', onHidePrevented);
        modalRef.current.removeEventListener('show.bs.modal', onShow);
        modalRef.current.removeEventListener('shown.bs.modal', handleShown);
        BootstrapModal.getInstance(modalRef.current).dispose();
      }
    };
  }, []);

  useEffect(() => {
    if (modalRef.current) {
      if (isOpen) {
        BootstrapModal.getInstance(modalRef.current).show();
      } else {
        BootstrapModal.getInstance(modalRef.current).hide();
      }
    }
  }, [isOpen])

  const handleShown = (event: Event) => {
    onStateChanged(true);
    onShown(event);
  };

  const handleHidden = (event: Event) => {
    onStateChanged(false);
    onHidden(event);
  };

  return (
    <div ref={modalRef} className="modal fade" id={id} aria-hidden="true" tabIndex={-1}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
});

export default Modal;
