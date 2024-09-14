import React, { useEffect, useRef } from 'react';
import {ButtonProps, getClassName} from './Button';

interface Props extends ButtonProps {
  target: string,
}

export const ModalButton = ({
  buttonStyle,
  buttonSize,
  type = 'button',
  target,
  children,
  ...restProps
}: Props) => {
  const myRef = useRef();

  const handle = (event: CustomEvent<FormData>) => {
    console.log('Button got', event.type);
    console.log('Button got', [...event.detail]);
  }

  useEffect(() => {
    if (myRef.current) {
      (myRef.current as any).addEventListener('apply.modal', handle);
    }
    return () => {
      if (myRef.current) {
        (myRef.current as any).removeEventListener('apply.modal', handle);
      }
    }
  }, []);

  return <button ref={myRef} className={getClassName({buttonStyle, buttonSize})} data-bs-toggle="modal" data-bs-target={target} {...restProps}>{children}</button>
}

export default ModalButton;
