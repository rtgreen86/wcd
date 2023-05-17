import React from 'react';
import { useAuth } from '../features/auth';
import {Button, Main, Panel, Menu, MenuItem} from '../common/ui';

export default function Lock() {
  const { signin } = useAuth();

  const handleLogin = async () => {
    await signin();
  }

  return (
    <Main>
      <div>Application is locked</div>
      <button type="button" onClick={handleLogin}>
        Sign In
      </button>


      <section>
        <h3>Panel with menu</h3>
        <Panel><Menu>
          <MenuItem><Button>&lt;</Button><span>2023</span><Button>&gt;</Button></MenuItem>
          <MenuItem><Button>Button</Button></MenuItem>
          <MenuItem align="right"><Button>Button</Button></MenuItem>
          <MenuItem align="right"><Button>Button</Button></MenuItem>
        </Menu></Panel>
      </section>

    </Main>
  );
}
