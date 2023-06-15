import React from 'react';
import PropTypes from 'prop-types';
import { LocaleContext } from '../context/LocaleContext';

const defaultLocale = 'en-US'

export default function CalendarLocale({ locale, children }) {
  return (
    <LocaleContext.Provider value={locale}>{
      children
    }</LocaleContext.Provider>
  );
}

CalendarLocale.propTypes = {
  locale: PropTypes.string,
  children: PropTypes.node,
};

CalendarLocale.defaultProps = {
  locale: defaultLocale
};
