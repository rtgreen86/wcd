import React, { useState, useEffect } from 'react';

export default function TestFsApi() {
  const [ state, setState ] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const content = await electronAPI.fs.get('test-data.dat', {});
        setState(content);
        console.log('read file: OK');
      } catch (error) {
        console.log('Catch Exception', error)
        /* do nothing */
      }
    };
    load();
  }, []);

  const handleInput = (input: any) => {
    setState(input.currentTarget.value);
  };

  const handleSaveClick = () => {
    electronAPI.fs.put('test-data.dat', {
      body: state
    });
  };

  return (
    <div>
      <label>Test: <input type="text" value={state} onChange={handleInput}></input></label>
      <button onClick={handleSaveClick}>Save</button>
    </div>
  );
}
