import { useEffect, useRef } from 'react';
import Button, { ButtonProps } from './Button';

interface ModalToggleButtonProps extends ButtonProps {
  target: `#${string}`,
  onApply?: (formData: CustomEvent<FormData>) => void;
}

export const ModalToggleButton = ({
  target,
  children,
  onApply = () => undefined,
  ...restProps
}: ModalToggleButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>();

  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.addEventListener('apply.modal', onApply);
    }
    return () => {
      if (buttonRef.current) {
        buttonRef.current.removeEventListener('apply.modal', onApply);
      }
    };
  }, []);

  return <Button ref={buttonRef} data-bs-toggle="modal" data-bs-target={target} {...restProps}>{ children }</Button>
}

export default ModalToggleButton;
