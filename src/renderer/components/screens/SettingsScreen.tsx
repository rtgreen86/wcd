import BackPanel from '../back-panel';
import packageInfo from '../../../../package.json';
import { PinCodePanel } from '../panels';

export default function SettingsScreen() {
  return (
    <>
      <BackPanel />
      <main>
        <h1>Настройки</h1>
        <PinCodePanel />

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
      </main>
    </>
  );
}
