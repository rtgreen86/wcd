import { ReactNode } from "react";

export const ModalToggleButton = ({
  className = '',
  target,
  children
}: {
  className?: string,
  target: string,
  children?: ReactNode
}) => {
  return (
    <button type="button" className={`btn ${className}`} data-bs-toggle="modal" data-bs-target={target}>{
      children
    }</button>
  );
};
