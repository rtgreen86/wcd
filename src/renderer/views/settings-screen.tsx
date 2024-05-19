import React, { useContext, useState, useEffect } from 'react';
import BackPanel from '../components/back-panel';
import packageInfo from '../../../package.json';
import { DispatchContext, StateContext } from '../App';
import TestFsApi from '../components/TestFsApi';
import ShowPinCode from '../components/show-pin-code';
import PinSettings from '../components/PinSettings';

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
          <h1>Modal</h1>

          <p>You can protect your application data by settings PIN code.</p>

          <p>Information or status message.</p>

          <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#delete-pin-modal">
            Delete PIN
          </button> <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#set-pin-modal">
            Set PIN
          </button>

          <div className="modal fade" id="delete-pin-modal" aria-hidden="true" tabIndex={-1}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <form onSubmit={event => event.preventDefault()}>
                  <div className="modal-header">
                    <h5 className="modal-title">Delete PIN</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body text-center">
                    <p>Enter current PIN code to remove.</p>
                    <input type="password" name="pin-code" maxLength={4}></input>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <input type="submit" className="btn btn-danger" value="Delete" disabled/>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="modal fade" id="set-pin-modal" aria-hidden="true" tabIndex={-1}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <form onSubmit={event => event.preventDefault()}>
                  <div className="modal-header">
                    <h5 className="modal-title">Set PIN</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body text-center">
                    <p>Enter new PIN code to protect your application data.</p>
                    <div><label>New PIN code: <input type="password" name="pin-1" maxLength={4}></input></label></div>
                    <div><label>Reenter PIN code: <input type="password" name="pin-2" maxLength={4}></input></label></div>
                    <p>Information or Error message.</p>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <input type="submit" className="btn btn-primary" value="Set" disabled />
                  </div>
                </form>
              </div>
            </div>
          </div>

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
    </>
  )
}
