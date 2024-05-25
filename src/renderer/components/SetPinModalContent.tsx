import React from 'react';
import { ModalHeader, ModalBody, ModalFooter } from './Modal';
import InputPin from './InputPin';
import Button from './Button';

export default function SetPinModalContent() {
  return (
    <form onSubmit={event => event.preventDefault()}>
      <ModalHeader title='Set PIN' />
      <ModalBody>
        <div className="container-fluid text-center">
          <div className="row align-items-start"><div className="col">
            Enter new PIN code to protect your application data.
          </div></div>
          <div className="row align-items-start">
            <div className="col text-end"><label htmlFor="pin-1">New PIN code:</label></div>
            <div className="col text-start"><InputPin id="pin-1" name="pin-1" maxLength={4}></InputPin></div>
          </div>
          <div className="row align-items-start">
            <div className="col text-end"><label htmlFor="pin-2">Reenter PIN code:</label></div>
            <div className="col text-start"><InputPin id="pin-2" name="pin-2" maxLength={4}></InputPin></div>
          </div>
          <div className="row align-items-start">
            <div className="col">Information or Error message.</div>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button buttonStyle="secondary" onClick="modal-dismiss">Cancel</Button>
        <Button buttonType="submit" buttonStyle="primary" disabled>Set</Button>
      </ModalFooter>
    </form>
  );
}
