import React from 'react';
import PropTypes from 'prop-types';
import MonthGrid from './MonthGrid';
import YearGrid from './YearGrid.jsx';

export default function YearCalendar({year, firstDayOfWeek, weekendDays, marks, ...props}) {
  return (
    <div className="container calendar">
      <div className="caption">{year}</div>
      <YearGrid>{
        Array.from({length: 12}, (el, idx) => idx).map((month) => (
          <MonthGrid
            key={month}
            year={year}
            month={month}
            firstDayOfWeek={firstDayOfWeek}
            weekendDays={weekendDays}
            marks={marks}
            {...props}
          />
        ))
      }</YearGrid>
    </div>
  );
}

YearCalendar.propTypes = {
  year: PropTypes.number,
  firstDayOfWeek: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6]),
  weekendDays: PropTypes.arrayOf(PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6])),
  marks: PropTypes.objectOf(PropTypes.string)
};

YearCalendar.defaultProps = {
  year: undefined,
  firstDayOfWeek: undefined,
  weekendDays: undefined,
};
