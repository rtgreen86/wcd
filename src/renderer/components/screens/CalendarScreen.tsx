import './CalendarScreen.css';
import { useEffect } from 'react';
import { CalendarLocale } from '../../lib/Calendar';
import CalendarContainer from '../calendar-container';
import {ModalToggleButton} from '../Modal';
import { ChangePINModal } from '../../containers/modals/ModalChangePIN';
import { test, test2 } from '../../api';

export default function CalendarScreen() {
  useEffect(() => {
    runPrototypeCode();
  });

  const handleClick = async () => {
    const data = await test('Hello World!');
    console.log(data);
    if (data.status === 'success') {
      console.log(data.payload.content);
    }
  }

  const handleClick2 = async () => {
    const data = await test2();
    console.log(data);
  }

  return (
    <main className="container-xxl">
      {/* <div><ModalToggleButton target='#test-modal' className='btn-primary'>Open!</ModalToggleButton></div> */}

      <button onClick={handleClick} >Hello World!</button>
      <button onClick={handleClick2} >Crash</button>

      <CalendarLocale locale="ru-RU">
        <CalendarContainer />
      </CalendarLocale>

      <ChangePINModal id="test-modal" />
    </main>
  );
}

async function runPrototypeCode() {
  console.log('Starting prototype code form CalendarScreen...');

  const testString = 'Test Information.';
  const filename = 'my-file';

  console.log('Content:', testString);
  console.log('Saving to %s...', filename);

  console.log('Done');
  console.log('Reading data...');

  const data = 'static content';

  console.log('Done');
  console.log('Content: ', data);
  console.log('OK');
}