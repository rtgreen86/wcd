import React, { useState, useEffect } from 'react';

export default function ShowPinCode() {
  const [isLoading, setLoading] = useState(true);
  const [pinCode, setPinCode] = useState(null);

  const loadCode = async () => {
    const code = '';
    setPinCode(code);
    setLoading(false);
  };

  useEffect(() => { loadCode(); }, []);

  if (isLoading) {
    return (<div>Loading...</div>);
  }

  return (<div>Pin code is: {pinCode}</div>)
}
