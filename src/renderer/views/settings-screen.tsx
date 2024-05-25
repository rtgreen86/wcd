import React, { useContext, useState, useEffect } from 'react';
import BackPanel from '../components/back-panel';
import packageInfo from '../../../package.json';
import { DispatchContext, StateContext } from '../App';
import TestFsApi from '../components/TestFsApi';
import ShowPinCode from '../components/show-pin-code';
import PinSettings from '../components/PinSettings';
import Button from '../components/Button';
import Modal, {ModalHeader, ModalBody, ModalFooter} from '../components/Modal';
import InputPin from '../components/InputPin';

export default function SettingsScreen() {
  const state = useContext(StateContext);

  const dispatch = useContext(DispatchContext);

  const onBtnClick = () => {
    dispatch({ type: 'increment' });
  }

  return (
    <>
      <BackPanel />
      <main>
        <section>
          <h5>Modal</h5>

          <p>You can protect your application data by settings PIN code.</p>

          <Button buttonStyle='danger' onClick="modal-toggle" modalTarget="#delete-pin-modal">
            Delete PIN
          </Button> <Button buttonStyle="outline-dark" onClick="modal-toggle" modalTarget="#set-pin-modal">
            Set PIN
          </Button>
        </section>

        <section>
          <h6>PIN</h6>
          <PinSettings />
        </section>

        <section>
          <h1>Global State</h1>
          <button value={state} onClick={onBtnClick}>State: {state}</button>
        </section>

        <section>
          <h1>Pin Code</h1>
          <ShowPinCode />
        </section>

        <section>
          <h1>Save / Load</h1>
          <TestFsApi></TestFsApi>
        </section>

        <section>
          <form>
            <h1>Настройки</h1>
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
      </main>

      <Modal id="delete-pin-modal">
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
      </Modal>

      <Modal id="set-pin-modal">
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
      </Modal>
    </>
  )
}
