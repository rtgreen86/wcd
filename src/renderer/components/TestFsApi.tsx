import React, { useState, useEffect } from 'react';

export default function TestFsApi() {
  const [ state, setState ] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const content = await electronAPI.fs.loadUserFile({
          name: 'test-data.dat',
          token: ''
        });
        setState(content);
      } catch (error) {
        /* do nothing */
      }
    };
    load();
  }, []);

  const handleInput = (input: any) => {
    setState(input.currentTarget.value);
  };

  const handleSaveClick = () => {
    electronAPI.fs.saveUserFile({
      name: 'test-data.dat',
      token: '',
      content: state
    });
  };

  return (
    <div>
      <label>Test: <input type="text" value={state} onChange={handleInput}></input></label>
      <button onClick={handleSaveClick}>Save</button>
    </div>
  );
}
