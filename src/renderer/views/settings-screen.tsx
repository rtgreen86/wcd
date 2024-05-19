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

          <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#example-modal">
            Launch demo modal
          </button>

          <div className="modal fade" id="example-modal" tabIndex={-1}  aria-hidden="true" aria-labelledby="exampleModalToggleLabel">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Modal Title</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <p>Modal body text goes here.</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-primary" data-bs-target="#example-modal-2" data-bs-toggle="modal">Open second modal</button>
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-primary">Save changes</button>
                </div>
              </div>
            </div>
          </div>

          <div className="modal fade" id="example-modal-2" tabIndex={-1} aria-hidden="true" aria-labelledby="exampleModalToggleLabel2">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Modal Title 2</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  This is second modal content.
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-primary">Save changes</button>
                </div>
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
