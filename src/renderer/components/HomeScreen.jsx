import React from 'react';

import { Button } from './UIKit';

export default function HomeScreen() {
  return (
    <main>
      <section>
        <h1>Header 1</h1>
        <h2>Header 2</h2>
        <h3>Header 3</h3>
        <p>Default text. Съешь еще этих мягких французских булок, да выпей чаю.</p>
        <div>Text label</div>
      </section>

      <section>
        <h1>Buttons</h1>
        <Button accent>Accent</Button><span> </span>
        <Button accent disabled>Accent</Button><span> </span>
        <Button>Button</Button><span> </span>
        <Button isDisabled>Button</Button><span> </span>
        <a href="#">Link</a><span> </span>
      </section>





    </main>
  );
}
