import './CalendarScreen.css';
import React, { useEffect } from 'react';
import { CalendarLocale } from '../../lib/Calendar';
import CalendarContainer from '../calendar-container';
import {Modal, ModalHeader, ModalContent, ModalFooter, ModalToggleButton, ModalDismissButton} from '../Modal';
import {InputPIN} from '../Form';
import {EnterPINModal} from '../modals/EnterPINModal';

export default function CalendarScreen() {
  useEffect(() => {
    runPrototypeCode();
  });

  return (
    <main className="container-xxl">
      <div><ModalToggleButton target='#test-modal' className='btn-primary'>Open!</ModalToggleButton></div>

      <CalendarLocale locale="ru-RU">
        <CalendarContainer />
      </CalendarLocale>

      <EnterPINModal id="test-modal" title="Enter PIN"/>
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