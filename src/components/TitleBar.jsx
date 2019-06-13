import React from 'react';
import PropTypes from 'prop-types';

import './TitleBar.css';

const TitleBar = ({ title }) => (
  <div className="title-bar">
    <span className="title">{title}</span>
  </div>
);

TitleBar.propTypes = {
  title: PropTypes.string,
};

TitleBar.defaultProps = {
  title: '',
};

export default TitleBar;
