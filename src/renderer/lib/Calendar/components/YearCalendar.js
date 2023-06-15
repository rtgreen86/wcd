import React from 'react';
import PropTypes from 'prop-types';
import MonthCalendar from './MonthCalendar';

export default function YearCalendar({year}) {
  return (
    <div className="calendar-year">{
      Array.from({length: 12}, (el, idx) => (
        <MonthCalendar key={idx} year={year} month={idx + 1} />
      ))
    }</div>
  );
}

YearCalendar.propTypes = {
  year: PropTypes.number,
};

YearCalendar.defaultProps = {
  year: new Date().getUTCFullYear()
};
