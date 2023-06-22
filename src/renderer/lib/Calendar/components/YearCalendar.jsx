import './YearCalendar.css';

import React from 'react';
import PropTypes from 'prop-types';
import MonthCalendar from './MonthCalendar';

export default function YearCalendar({year, marks, onClick}) {
  return (
    <div className="calendar-year">{
      Array.from({length: 12}, (el, idx) => (
        <MonthCalendar key={idx} year={year} month={idx + 1} marks={marks} onClick={onClick} />
      ))
    }</div>
  );
}

YearCalendar.propTypes = {
  year: PropTypes.number,
  marks: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)),
  onClick: PropTypes.func
};

YearCalendar.defaultProps = {
  year: new Date().getUTCFullYear()
};
