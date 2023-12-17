import './login-form.css';
import React from 'react';
import PropTypes from 'prop-types';

export default function LoginForm({ value, autoFocus, onChange, onChangeValue, onPinEntered }) {
  const rxPartialPin = /^\d{1,4}$/;
  const rxFullPin = /^\d{4}$/;

  const handleFocus = (event) => {
    event.currentTarget.removeAttribute('readonly');
  }

  const handleChange = (event) => {
    const value = event.currentTarget.value;
    if (value === '' || rxPartialPin.test(value)) {
      onChange(event);
      onChangeValue(value);
    }
    if (rxFullPin.test(value)) {
      onPinEntered(value);
    }
  }

  return (<form className="login-form">
    <div>
      Доступ ограничен.<br />
      Пожалуйста введите ПИН-код.
    </div>
    <input
      value={value}
      autoFocus={autoFocus}
      type="password"
      maxLength="4"
      pattern="\d{4}"
      autoComplete="off"
      readOnly
      onFocus={handleFocus}
      onChange={handleChange} /><br />
  </form>);
}

LoginForm.propTypes = {
  value: PropTypes.string,
  autoFocus: PropTypes.bool,
  onChange: PropTypes.func,
  onChangeValue: PropTypes.func,
  onPinEntered: PropTypes.func
};

LoginForm.defaultProps = {
  value: '',
  autoFocus: false,
  onChange: () => {},
  onChangeValue: () => {},
  onPinEntered: () => {}
}
