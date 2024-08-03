import React, { ReactNode } from 'react';
import { LocaleContext } from '../context/LocaleContext';

type Props = {
  locale?: string,
  children?: ReactNode
};

const CalendarLocale = ({
  locale = 'en-US',
  children
}: Props) => {
  return (
    <LocaleContext.Provider value={locale}>{
      children
    }</LocaleContext.Provider>
  );
};

export default CalendarLocale;
