import React, { useContext } from 'react';
import BackPanel from '../components/BackPanel';
import packageInfo from '../../../package.json';

import { DispatchContext, StateContext } from '../App';

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
          <h1>Global State</h1>
          <button value={state} onClick={onBtnClick}>State: {state}</button>
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
