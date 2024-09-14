import React, { useEffect, useRef } from 'react';
import Button, { ButtonProps } from './Button';

interface ModalToggleButtonProps extends ButtonProps {
  target: `#${string}`,
  onApply?: (formData: FormData) => void;
}

export const ModalToggleButton = ({
  target,
  children,
  onApply = () => undefined,
  ...restProps
}: ModalToggleButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>();

  const handleApply = (event: CustomEvent<FormData>) => {
    onApply(event.detail);
  };

  useEffect(() => {
    console.log('effect');
    if (buttonRef.current) {
      console.log('subscribe', buttonRef.current);
      buttonRef.current.addEventListener('apply.modal', handleApply);
    }
    return () => {
      if (buttonRef.current) {
        buttonRef.current.removeEventListener('apply.modal', handleApply);
      }
    };
  }, []);

  return <Button ref={buttonRef} data-bs-toggle="modal" data-bs-target={target} {...restProps}>{ children }</Button>
}

export default ModalToggleButton;
