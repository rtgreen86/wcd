import React, { ReactNode, useRef, useEffect } from 'react';

export interface ModalProps {
  id: string,
  children?: ReactNode,
  onHide?: (event: Event) => void,
  onHidden?: (event: Event) => void,
  onHidePrevented?: (event: Event) => void,
  onShow?: (event: Event) => void,
  onShown?: (event: Event) => void,
}

const Modal = ({
  id,
  children,
  onHide = () => undefined,
  onHidden = () => undefined,
  onHidePrevented = () => undefined,
  onShow = () => undefined,
  onShown = () => undefined,
}: ModalProps) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener('hide.bs.modal', onHide);
      ref.current.addEventListener('hidden.bs.modal', onHidden);
      ref.current.addEventListener('hidePrevented.bs.modal', onHidePrevented);
      ref.current.addEventListener('show.bs.modal', onShow);
      ref.current.addEventListener('shown.bs.modal', onShown);
    }

    return () => {
      if (ref.current) {
        ref.current.removeEventListener('hide.bs.modal', onHide);
        ref.current.removeEventListener('hidden.bs.modal', onHidden);
        ref.current.removeEventListener('hidePrevented.bs.modal', onHidePrevented);
        ref.current.removeEventListener('show.bs.modal', onShow);
        ref.current.removeEventListener('shown.bs.modal', onShown);
      }
    };
  });

  return (
    <div ref={ref} className="modal fade" id={id} aria-hidden="true" tabIndex={-1}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
