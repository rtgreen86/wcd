import { ReactNode } from 'react';
import { LocaleContext } from './context/LocaleContext';

const CalendarLocale = ({
  locale = 'en-US',
  children
}: {
  locale?: string,
  children?: ReactNode
}) => {
  return (
    <LocaleContext.Provider value={locale}>{
      children
    }</LocaleContext.Provider>
  );
};

export default CalendarLocale;
