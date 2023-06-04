import React from 'react';
import PropTypes from 'prop-types';

import './YearGrid.css';

export default function YearGrid({ children }) {
  return <div className="cal-gird">{ children }</div>;
}

YearGrid.propTypes = {
  children: PropTypes.node,
};
