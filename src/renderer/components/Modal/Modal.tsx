import { ReactNode, useRef, useEffect, useCallback } from 'react';
import { Modal as BootstrapModal } from 'bootstrap';
import { ModalEvent } from './ModalEvent';
import { ModalTypes } from './ModalTypes';

const getDialogClasses = (modalTypes: ModalTypes) => [
  'modal-dialog',
  (modalTypes & ModalTypes.Centered) !== 0 ? 'modal-dialog-centered' : '',
  (modalTypes & ModalTypes.Scrollable) !== 0 ? 'modal-dialog-scrollable' : '',
  (modalTypes & ModalTypes.FullScreen) !== 0 ? 'modal-fullscreen' : '',
].filter(val => val !== '').join(' ');

export const Modal = ({
  id,
  modalTypes = ModalTypes.None,
  isOpen = false,
  ariaLabel = '',
  children,
  onHide = () => undefined,
  onHidden = () => undefined,
  onHidePrevented = () => undefined,
  onShow = () => undefined,
  onShown = () => undefined,
  onStateChanged = () => undefined,
}: {
  id: string,
  modalTypes?: ModalTypes,
  isOpen?: boolean,
  ariaLabel?: string,
  children?: ReactNode,
  onHide?: (event: ModalEvent) => void,
  onHidden?: (event: ModalEvent) => void,
  onHidePrevented?: (event: ModalEvent) => void,
  onShow?: (event: ModalEvent) => void,
  onShown?: (event: ModalEvent) => void,
  onStateChanged?: (isOpen: boolean) => void;
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const show = () => {
    if (modalRef.current) BootstrapModal.getInstance(modalRef.current).show();
  };

  const hide = () => {
    if (modalRef.current) BootstrapModal.getInstance(modalRef.current).hide();
  };

  const handleHide = onHide;

  const handleHidden = useCallback((event: ModalEvent) => {
    onStateChanged(false);
    onHidden(event);
  }, [onStateChanged, onHidden]);

  const handleHidePrevented = onHidePrevented;

  const handleShow = onShow;

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
      modalRef.current.addEventListener('hide.bs.modal', handleHide);
      modalRef.current.addEventListener('hidden.bs.modal', handleHidden);
      modalRef.current.addEventListener('hidePrevented.bs.modal', handleHidePrevented);
      modalRef.current.addEventListener('show.bs.modal', handleShow);
      modalRef.current.addEventListener('shown.bs.modal', handleShown);
    }
    return () => {
      if (modalRef.current) {
        modalRef.current.removeEventListener('hide.bs.modal', handleHide);
        modalRef.current.removeEventListener('hidden.bs.modal', handleHidden);
        modalRef.current.removeEventListener('hidePrevented.bs.modal', handleHidePrevented);
        modalRef.current.removeEventListener('show.bs.modal', handleShow);
        modalRef.current.removeEventListener('shown.bs.modal', handleShown);
      }
    };
  }, [handleHide, handleHidden, handleHidePrevented, handleShow, handleShown]);

  useEffect(() => { if (isOpen) show(); else hide(); }, [isOpen]);

  const canClose = (modalTypes & ModalTypes.BlockingModal) === 0;
  const backdrop = canClose ? 'true' : 'static';

  return (
    <div ref={modalRef} className="modal fade" id={id} tabIndex={-1} aria-label={ariaLabel} role="dialog" aria-modal="true" data-bs-backdrop={backdrop} data-bs-keyboard={canClose}>
      <div className={getDialogClasses(modalTypes)}>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};






