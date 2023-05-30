import React, { useState } from 'react';

import { Button, Panel, Menu, MenuItem } from '../Lib/UIKit';
import LoginForm from '../Components/LoginForm.jsx';
import BackPanel from '../Components/BackPanel.jsx';

export default function ControlsScreen() {
  const [pin, setPin] = useState('');

  return (
    <>
      <BackPanel />
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

        <section>
          <h1>Panel</h1>
          <Panel>
            <span>Span</span> <Button>Button</Button>
          </Panel>
        </section>

        <section>
          <h1>Menu</h1>
          <Menu>
            <MenuItem><Button>&lt;</Button><span>2023</span><Button>&gt;</Button></MenuItem>
            <MenuItem><Button>Button</Button></MenuItem>
            <MenuItem align="right"><Button>Button</Button></MenuItem>
            <MenuItem align="right"><Button>Button</Button></MenuItem>
          </Menu>
        </section>

        <section>
          <h1>Panel with menu</h1>
          <Panel><Menu>
            <MenuItem><Button>&lt;</Button><span>2023</span><Button>&gt;</Button></MenuItem>
            <MenuItem><Button>Button</Button></MenuItem>
            <MenuItem align="right"><Button>Button</Button></MenuItem>
            <MenuItem align="right"><Button>Button</Button></MenuItem>
          </Menu></Panel>
        </section>

        <section>
          <form>
            <header><h3>Form</h3></header>
            <section>
              <label htmlFor="add-date-field">Укажите дату:</label><br />
              <input type="date" id="add-date-field" /><br />
              <input type="radio" id="period-auto-detect" name="period-type" /><label htmlFor="period-auto-detect">Автоматическое определение</label><br />
              <input type="radio" id="period-manual" name="period-type" /><label htmlFor="period-manual">Вручную</label><br />
              <label htmlFor="period">Дней в цикле:</label><br />
              <input type="number" id="period" defaultValue="28" /><br />
              <label htmlFor="period-disabled">Дней в цикле:</label><br />
              <input type="number" id="period-disabled" disabled value="28" /><br />
            </section>
            <footer style={{ margin: "5px 0px" }}><input type="submit" value="Добавить" /> <input type="button" value="Отмена" /></footer>
          </form>
        </section>

        <section>
          <h3>Login Form</h3>
          <LoginForm value={pin} onChangeValue={setPin} />
        </section>
      </main>
    </>
  );
}
