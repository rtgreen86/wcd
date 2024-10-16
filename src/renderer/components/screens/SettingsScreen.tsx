import React, {useState, MouseEvent, useEffect, useRef, FormEvent} from 'react';
import BackPanel from '../back-panel';
import packageInfo from '../../../../package.json';
import PinSettings from '../PinSettings';
import DeletePinModal from '../modals/DeletePinModal';
import SetPinModal from '../modals/SetPinModal';

import ModalToggleButton from '../controls/ModalToggleButton';
import ModalWithForm from '../controls/ModalWithForm';
import Modal, {ModalRef} from '../modals/Modal';
import ModalHeader from '../controls/ModalHeader';
import ModalBody from '../controls/ModalBody';
import ModalFooter from '../controls/ModalFooter';
import ModalButton from '../controls/ModalButton';
import Button from '../controls/Button';

// Debug imports

import MessageBox from '../modals/MessageBox';
import ProgressBox from '../modals/ProgressBox';
import FormModal from '../modals/FormModal';

// End of Debug imports


export default function SettingsScreen() {
  const myDialogRef = useRef<ModalRef>();

  const [isDialog1Open, setDialog1Open] = useState(false);
  const [isDialog2Open, setDialog2Open] = useState(false);

  useEffect(() => {
    console.log('STATUS:');
    console.log('isDialog1Open', isDialog1Open);
    console.log('isDialog2Open', isDialog2Open);
  });

  const handleOpenButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setDialog1Open(true);
  };

  const handleCloseButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (myDialogRef.current) myDialogRef.current.hide();
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Event: Form Submit');
  };

  const handleApply = (formData: FormData) => {
    console.log('Event: Dialog Apply', [...formData.values()]);
  }

  const handleApplyOnButton = (event: CustomEvent<FormData>) => {
    console.log('Event: Dialog Apply on Button', [...event.detail.values()]);
  }

  // DEBUG

  const [isOpen, setOpen] = useState(false);
  const myModalRef = useRef<ModalRef>();

  const open = () => {
    if (myModalRef.current) myModalRef.current.show();
  };

  const close = () => {
    if (myModalRef.current) myModalRef.current.hide();
  };

  const myProgressRef = useRef<ModalRef>();

  const startProcess = () => {
    if (myProgressRef.current) {
        const current = myProgressRef.current;
        current.show();
        setTimeout(() => current.hide(), 3000);
    }
  };

  const handleMyApply = (formData: FormData) => {
    console.log('handleMyApply');
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }
  };

  const handleMyApplyButton = (event: CustomEvent<FormData>) => {
    console.log('handleMyApplyButton');
    for (const [key, value] of event.detail.entries()) {
      console.log(key, value);
    }
  };

  // END of DEBUG

  return (
    <>
      <BackPanel />
      <main>
        {/* Debug */}
        <section>
          <div>Dialog debug</div>

          <button onClick={() => setOpen(true)}>Open props</button>
          <button onClick={() => open()}>Open</button>
          <ModalToggleButton target="#test-id">toggle button</ModalToggleButton>

          <MessageBox id="test-id" ref={myModalRef} title="The Title" okButtonTitle="OK" isOpen={isOpen} onStateChanged={setOpen}>
            Hello World! <button onClick={() => close()}>Close</button>
          </MessageBox>

          <button onClick={() => startProcess()}>Start</button>

          <ProgressBox id="my-progress" ref={myProgressRef} title='The Process!'>Loading...</ProgressBox>

          <ModalToggleButton target="#my-form-modal" onApply={handleMyApplyButton}>toggle form</ModalToggleButton>

          <FormModal id="my-form-modal" title="Form!" submitCaption="Apply" cancelCaption="Cancel" onApply={handleMyApply}>
            <label>Test Field:<input type="text" name="test"></input></label>
          </FormModal>

          <ModalToggleButton target="#my-set-pin-modal" onApply={handleMyApplyButton}>setpin dg</ModalToggleButton>

          <SetPinModal id="my-set-pin-modal" />

          <ModalToggleButton target="#my-delete-modal" onApply={handleMyApplyButton}>delete pin</ModalToggleButton>

          <DeletePinModal id="my-delete-modal" />
        </section>
        {/* End of Debug */}

        <h1>Настройки</h1>
        <PinSettings />
        <section style={{ display: 'none' }}>
          <form>
            <section>
              <h2>Цикл</h2>
              <input type="radio" id="period-auto-detect" name="period-type" /><label htmlFor="period-auto-detect">Автоматическое определение</label><br />
              <input type="radio" id="period-manual" name="period-type" /><label htmlFor="period-manual">Вручную</label> (<label htmlFor="period">дней в цикле:</label> <input type="number" id="period" />)<br />
            </section>
            <br /><input type="submit" value="Сохранить" />
          </form>
        </section>
        <section>
          <h1>О программе</h1>
          <p>{packageInfo.productName}<br />Версия {packageInfo.version}<br />{packageInfo.description}</p>
        </section>

        <section>
          <div>Modal Dialogs development</div>
          <div>
            <ModalToggleButton target="#my-form-modal" onApply={handleApplyOnButton}>Open FORM Modal (BS)</ModalToggleButton>
            <Button onClick={handleOpenButtonClick}>Open FORM Modal (JS)</Button>
          </div>
          <div>
            <ModalToggleButton target="#my-modal">Open Modal (BS)</ModalToggleButton>
          </div>
        </section>
      </main>

      <DeletePinModal id="delete-pin-modal" />
      <SetPinModal id="set-pin-modal" />

      <Modal ref={myDialogRef} id='my-modal' isOpen={isDialog2Open} onStateChanged={setDialog2Open}>
        <ModalHeader title='Hello World' canClose={true}></ModalHeader>
        <ModalBody>Hello World!</ModalBody>
        <ModalFooter>
          <Button onClick={handleCloseButtonClick}>Close!</Button>
        </ModalFooter>
      </Modal>

    </>
  )
}
