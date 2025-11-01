import { ReactNode } from "react";

export const ModalDismissButton = ({
  className = '',
  children
}: {
  className?: string,
  children?: ReactNode
}) => {
  return (
    <button type="button" className={`btn ${className}`} data-bs-dismiss="modal">{
      children
    }</button>
  );
};
