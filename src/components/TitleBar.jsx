import React from 'react';
import PropTypes from 'prop-types';

import './TitleBar.css';

const TitleBar = ({ title, addFolder, addFile }) => (
  <div className="title-bar">
    <span className="title">{title}</span>
    <div className="options">
      <span onClick={() => addFolder()}>Add Folder</span>
      <span onClick={() => addFile()}>Add File</span>
    </div>
  </div>
);

TitleBar.propTypes = {
  title: PropTypes.string,
  addFolder: PropTypes.func,
  addFile: PropTypes.func,
};

TitleBar.defaultProps = {
  title: '',
  addFolder: () => {},
  addFile: () => {},
};

export default TitleBar;
