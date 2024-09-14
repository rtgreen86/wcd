import { ReactNode, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Modal as BootstrapModal } from 'bootstrap';

export interface ModalEvent extends Event {
  relatedTarget?: HTMLElement,
}

export interface ModalProps {
  id: string,
  isOpen?: boolean,
  canClose?: boolean,
  children?: ReactNode,
  onHide?: (event: ModalEvent) => void,
  onHidden?: (event: ModalEvent) => void,
  onHidePrevented?: (event: ModalEvent) => void,
  onShow?: (event: ModalEvent) => void,
  onShown?: (event: ModalEvent) => void,
  onStateChanged?: (isOpen: boolean) => void;
}

export interface ModalRef {
  show: () => void,
  hide: () => void,
}

export const Modal = forwardRef<ModalRef, ModalProps>(({
  id,
  isOpen,
  children,
  canClose = true,
  onHide = () => undefined,
  onHidden = () => undefined,
  onHidePrevented = () => undefined,
  onShow = () => undefined,
  onShown = () => undefined,
  onStateChanged = () => undefined,
}, forwardedRef) => {
  const modalRef = useRef<HTMLDivElement>(null);

  function show () {
    if (modalRef.current) BootstrapModal.getInstance(modalRef.current).show();
  }

  function hide() {
    if (modalRef.current) BootstrapModal.getInstance(modalRef.current).hide();
  }

  function handleShown(event: Event) {
    onStateChanged(true);
    onShown(event);
  }

  function handleHidden(event: Event) {
    onStateChanged(false);
    onHidden(event);
  }

  useImperativeHandle(forwardedRef, () => ({ show, hide }), []);

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
  }, [ onHide, handleHidden, onHidePrevented, onShow, handleShown ]);

  useEffect(() => { if (isOpen) show(); else hide(); }, [ isOpen ]);

  const backdrop = canClose ? 'true' : 'static';

  return (
    <div ref={modalRef} className="modal fade" id={id} aria-hidden="true" tabIndex={-1} data-bs-backdrop={backdrop} data-bs-keyboard={canClose}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
});

export default Modal;
