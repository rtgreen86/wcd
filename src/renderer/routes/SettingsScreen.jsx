import React from 'react';

import BackPanel from '../Components/BackPanel.jsx';

export default function SettingsScreen() {
  return (
    <>
      <BackPanel />
      <main>
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
          <p>Календарь, версия 1.0.0. 2023.</p>
        </section>
      </main>
    </>
  )
}
