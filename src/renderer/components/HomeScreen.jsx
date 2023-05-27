import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import { Button, Panel, Menu, MenuItem } from './UIKit';
import LoginForm from './LoginForm.jsx';

export default function HomeScreen() {
  const [pin, setPin] = useState('');

  const navigate = useNavigate();

  return (
    <main>
      <section>
        <Button onClick={() => navigate('/controls')}>Controls</Button>
      </section>

    </main>
  );
}
