import React from 'react';
import PropTypes from 'prop-types';
import HorizontalToolbar from './HorizontalToolbar';

import './TopToolbar.css';

export default function TopToolbar({ className, children }) {
  return <HorizontalToolbar className={className}>{ children }</HorizontalToolbar>;
}

TopToolbar.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};

TopToolbar.defaultProps = {
  className: 'uikit-toolbar horizontal top clearfix',
}

