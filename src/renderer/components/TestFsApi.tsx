import React, { useState, useEffect } from 'react';

export default function TestFsApi() {
  const [ state, setState ] = useState('');

  const handleInput = (input: any) => {
    setState(input.currentTarget.value);
  };

  const handleSaveClick = () => {

  };

  return (
    <div>
      <label>Test: <input type="text" value={state} onChange={handleInput}></input></label>
      <button onClick={handleSaveClick}>Save</button>
    </div>
  );
}
