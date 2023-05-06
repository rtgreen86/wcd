import React from 'react';
import { useAuth } from '../features/auth';
import {Button, Main} from '../common/ui';

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
        <h1>Header 1</h1>
        <h2>Header 2</h2>
        <h3>Header 3</h3>
        <p>Default text. Съешь еще этих мягких французских булок, да выпей чаю.</p>
        <div>Text label</div>
      </section>

      <section>
        <h1>Buttons</h1>

        <Button isAccent>Accent</Button> <Button isAaccent isDisabled>Accent</Button> <Button>Button</Button> <Button isDisabled>Button</Button>

      </section>




    </Main>
  );
}
