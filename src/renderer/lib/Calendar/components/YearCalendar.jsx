import React from 'react';
import PropTypes from 'prop-types';
import MonthCalendar from './MonthCalendar.jsx';

export default function YearCalendar({year, marks}) {
  return (
    <div className="calendar-year">{
      Array.from({length: 12}, (el, idx) => (
        <MonthCalendar key={idx} year={year} month={idx + 1} marks={marks} />
      ))
    }</div>
  );
}

YearCalendar.propTypes = {
  year: PropTypes.number,
  marks: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string))
};

YearCalendar.defaultProps = {
  year: new Date().getUTCFullYear()
};
