import { useRef, useEffect, useCallback } from 'react';
import { Modal as BootstrapModal } from 'bootstrap';
import { ModalProps, ModalEvent } from './types';
import { ModalTypes, ModalButtons } from './enums';

const noop = () => {};

const ModalHeader = ({
  modalTypes,
  children,
}: Pick<ModalProps, 'modalTypes' | 'children'>) => (
  <div className="modal-header">
    <h1 className="modal-title fs-5">{children}</h1>
    {modalTypes & ModalTypes.BlockingModal ? null : <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>}
  </div>
);

const ModalFooter = ({
  modalButtons,
  disabled,
  captionOK = 'OK',
  captionCancel = 'Cancel'
}: Pick<ModalProps, 'modalButtons' | 'disabled' | 'captionOK' | 'captionCancel'>) => (
  <div className="modal-footer">
    {modalButtons & ModalButtons.ButtonCancel ? <button type="button" className='btn btn-secondary' data-bs-dismiss="modal">{captionCancel}</button> : null}
    {modalButtons & ModalButtons.ButtonOK ? <button type="submit" className='btn btn-primary' disabled={disabled}>{captionOK}</button>: null}
  </div>
);

const getDialogClasses = (modalTypes: ModalTypes) => [
  'modal-dialog',
  (modalTypes & ModalTypes.Centered) !== 0 ? 'modal-dialog-centered' : '',
  (modalTypes & ModalTypes.Scrollable) !== 0 ? 'modal-dialog-scrollable' : '',
  (modalTypes & ModalTypes.FullScreen) !== 0 ? 'modal-fullscreen' : '',
].filter(val => val !== '').join(' ');

export const Modal = ({
    id,
    className = '',
    title,
    modalTypes = ModalTypes.None,
    modalButtons = ModalButtons.ButtonOK | ModalButtons.ButtonCancel,
    isOpen,
    disabled = false,
    ariaLabel,
    children,
    captionOK,
    captionCancel,
    onHide = noop,
    onHidden = noop,
    onHidePrevented = noop,
    onShow = noop,
    onShown = noop,
    onSubmit = noop,
    onStateChanged = noop,
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const show = () => {
    if (modalRef.current) BootstrapModal.getInstance(modalRef.current).show();
  };

  const hide = () => {
    if (modalRef.current) BootstrapModal.getInstance(modalRef.current).hide();
  };

  const handleHidden = useCallback((event: ModalEvent) => {
    onStateChanged(false);
    onHidden(event);
  }, [onStateChanged, onHidden]);

  const handleShown = useCallback((event: ModalEvent) => {
    onStateChanged(true);
    onShown(event);
  }, [onStateChanged, onShown]);

  useEffect(() => {
    if (modalRef.current) BootstrapModal.getOrCreateInstance(modalRef.current);
    return () => {
      if (modalRef.current) BootstrapModal.getInstance(modalRef.current).dispose();
    };
  }, []);

  useEffect(() => {
    if (modalRef.current) {
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
      }
    };
  }, [onHide, handleHidden, onHidePrevented, onShow, handleShown]);

  useEffect(() => { if (isOpen) show(); else hide(); }, [isOpen]);

  const canClose = (modalTypes & ModalTypes.BlockingModal) === 0;
  const backdrop = canClose ? 'true' : 'static';

  return (
    <div ref={modalRef} className={`modal fade ${className}`} id={id} tabIndex={-1} aria-label={ariaLabel}
      aria-hidden="true" role="dialog" aria-modal="true" data-bs-backdrop={backdrop} data-bs-keyboard={canClose}>
      <div className={getDialogClasses(modalTypes)}>
        <form className="modal-content" onSubmit={onSubmit}>
          <ModalHeader modalTypes={modalTypes}>{title}</ModalHeader>
          <div className="modal-body">{children}</div>
          <ModalFooter modalButtons={modalButtons} captionOK={captionOK} captionCancel={captionCancel} disabled={disabled}></ModalFooter>
        </form>
      </div>
    </div>
  );
};
