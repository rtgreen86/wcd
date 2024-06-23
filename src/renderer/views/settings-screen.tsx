import React, { useContext } from 'react';
import BackPanel from '../components/back-panel';
import packageInfo from '../../../package.json';
import { DispatchContext, StateContext } from '../App';
import TestFsApi from '../components/TestFsApi';
import ShowPinCode from '../components/show-pin-code';
import PinSettings from '../components/PinSettings';
import DeletePinModal from '../components/modals/DeletePinModal';
import SetPinModal from '../components/modals/SetPinModal';

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
        <PinSettings />

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

      <DeletePinModal id="delete-pin-modal" />
      <SetPinModal id="set-pin-modal" />
    </>
  )
}
