import React from 'react';
import { ModalHeader, ModalBody, ModalFooter } from './Modal';
import InputPin from './InputPin';
import Button from './Button';

export default function DeletePinModalContent() {
  return (
    <form onSubmit={event => event.preventDefault()}>
      <ModalHeader title='Delete PIN' />
      <ModalBody>
        <p>Enter current PIN code to remove.</p>
        <InputPin name="pin-code" maxLength={4}></InputPin>
      </ModalBody>
      <ModalFooter>
        <Button buttonStyle="outline-secondary" onClick="modal-dismiss">Cancel</Button>
        <Button buttonType="submit" buttonStyle="danger" disabled>Delete</Button>
      </ModalFooter>
    </form>
  );
}
