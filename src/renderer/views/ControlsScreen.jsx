import React, { useState, useContext } from 'react';

import { Panel, Menu } from '../lib/UIKit';
import BackPanel from '../components/back-panel';

import {DispatchContext, StateContext} from '../app';

export default function ControlsScreen() {
  const [pin, setPin] = useState('');

  const [text, setText] = useState('');

  const handleTextInput = (input) => {
    setText(input.currentTarget.value);
  };

  const handleSaveClick = () => {
    window.electronAPI.saveFile(text);
  };

  const handleLoadClick = async () => {
    const data = await window.electronAPI.loadFile();
    setText(data);
  }

  const state = useContext(StateContext);

  const dispatch = useContext(DispatchContext);

  const onBtnClick = () => {
    dispatch({type: 'increment'});
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
          <h1>File System Connection</h1>
          <div>Save next field content to FS</div>
          <div><input type="text" value={text} onChange={handleTextInput}></input></div>
        </section>









      </main>
    </>
  );
}
