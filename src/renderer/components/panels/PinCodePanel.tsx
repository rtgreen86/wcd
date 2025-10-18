import { useState, useEffect } from 'react';
import { isPinExists } from 'src/renderer/apiBridge';
import { ModalToggleButton } from '../controls';
import { SetPinModal, DeletePinModal } from '../modals';

export const PinCodePanel = () => {
  const [loading, setLoading] = useState(true);
  const [pinExist, setPinExist] = useState(false);
  const [error, setError] = useState('');

  async function checkPinCode() {
    try {
      const exist = await isPinExists();
      setPinExist(exist);
      setLoading(false);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError('Unexpected error.');
    }
  }

  function handleSuccessPinSet() {
    setError('');
    setPinExist(true);
  }

  function handleFailPinSet() {
    setError('An error occurred while setting the code.');
  }

  function handleSuccessPinRemoved() {
    setError('');
    setPinExist(false);
  }

  function getMessage() {
    if (loading) return 'Please wait...';
    if (error) return error;
    if (pinExist) return 'Your application data protected by PIN code.';
    return 'You can protect your application data by settings PIN code.';
  }

  useEffect(() => { checkPinCode(); }, []);

  const isSetPinVisible = !loading && !error && !pinExist;
  const isDeletePinVisible = !loading && !error && pinExist;

  return (
    <section>
      <h5>PIN code</h5>
      <p>{ getMessage() }</p>
      { isSetPinVisible && <ModalToggleButton buttonStyle="outline-dark" target="#modal-set-pin">Set PIN</ModalToggleButton> }
      { isDeletePinVisible && <ModalToggleButton buttonStyle="danger" target="#modal-delete-pin">Delete PIN</ModalToggleButton> }
      <DeletePinModal id="modal-delete-pin" onSuccess={handleSuccessPinRemoved} />
      <SetPinModal id="modal-set-pin" onSuccess={handleSuccessPinSet} onFail={handleFailPinSet} />
    </section>
  );
}
